import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  createDatabase,
  dropDatabase,
  getDatabaseConnection,
} from "./config/database.js";

const databaseDir = path.dirname(fileURLToPath(import.meta.url));

const migrationDir = path.join(databaseDir, "migrations");
const seedDir = path.join(databaseDir, "seed");

type SqlType = "migration" | "seed";

async function getSqlFiles(directory: string) {
  const files = await fs.readdir(directory);

  return files
    .filter((file) => file.endsWith(".sql"))
    .sort()
    .map((file) => path.join(directory, file));
}

async function ensureSqlHistoryTable(connection: any) {
  await connection.query(`
    CREATE TABLE IF NOT EXISTS _sql_files (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      file_name VARCHAR(255) NOT NULL,
      file_type ENUM('migration', 'seed') NOT NULL,
      executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

      UNIQUE KEY uk_sql_file (file_name, file_type)
    )
  `);
}

async function isExecuted(
  connection: any,
  fileName: string,
  fileType: SqlType,
) {
  const [rows]: any = await connection.query(
    `
    SELECT id
    FROM _sql_files
    WHERE file_name = ?
      AND file_type = ?
    LIMIT 1
    `,
    [fileName, fileType],
  );

  return rows.length > 0;
}

async function markExecuted(
  connection: any,
  fileName: string,
  fileType: SqlType,
) {
  await connection.query(
    `
    INSERT INTO _sql_files (
      file_name,
      file_type
    )
    VALUES (?, ?)
    `,
    [fileName, fileType],
  );
}

async function runSqlFiles(
  directory: string,
  fileType: SqlType,
  force = false,
) {
  const connection = await getDatabaseConnection();

  try {
    await ensureSqlHistoryTable(connection);

    const files = await getSqlFiles(directory);

    for (const file of files) {
      const fileName = path.basename(file);

      if (!force) {
        const executed = await isExecuted(connection, fileName, fileType);

        if (executed) {
          console.log(`⏭ Skip ${fileType}: ${fileName}`);
          continue;
        }
      }

      const sql = await fs.readFile(file, "utf8");

      if (!sql.trim()) {
        console.log(`⚠ Skip empty ${fileType}: ${fileName}`);
        continue;
      }

      console.log(`▶ Running ${fileType}: ${fileName}`);

      try {
        await connection.query(sql);

        await markExecuted(connection, fileName, fileType);

        console.log(`✓ Completed ${fileType}: ${fileName}`);
      } catch (error) {
        console.error(`✗ Failed ${fileType}: ${fileName}`);

        throw error;
      }
    }
  } finally {
    await connection.end();
  }
}

async function migrate() {
  console.log("================================");
  console.log("          MIGRATION");
  console.log("================================\n");

  await runSqlFiles(migrationDir, "migration");

  console.log("\n================================");
  console.log("             SEED");
  console.log("================================\n");

  await runSqlFiles(seedDir, "seed");
}

async function reset() {
  console.log("================================");
  console.log("        DATABASE RESET");
  console.log("================================\n");

  console.log("▶ Dropping database...");
  await dropDatabase();

  console.log("✓ Database dropped");

  console.log("▶ Creating database...");
  await createDatabase();

  console.log("✓ Database created\n");

  // Force = true
  // Database mới nên _sql_files chưa có gì,
  // nhưng force giúp reset luôn chạy toàn bộ file.
  await runSqlFiles(migrationDir, "migration", true);

  await runSqlFiles(seedDir, "seed", true);

  console.log("\n================================");
  console.log("     DATABASE RESET COMPLETE");
  console.log("================================");
}

async function main() {
  const command = process.argv[2] ?? "migrate";

  try {
    switch (command) {
      case "migrate":
        await migrate();
        break;

      case "reset":
        await reset();
        break;

      default:
        console.error(`
Unknown command: ${command}

Available commands:

  migrate
  reset
        `);

        process.exit(1);
    }

    console.log("\n✓ Done");
  } catch (error) {
    console.error("\n✗ Database setup failed:");
    console.error(error);

    process.exit(1);
  }
}

main();
