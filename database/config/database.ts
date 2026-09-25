import "dotenv/config";
import mysql from "mysql2/promise";

const DB_HOST = process.env.DB_HOST ?? "localhost";
const DB_PORT = Number(process.env.DB_PORT ?? 3306);
const DB_USER = process.env.DB_USER ?? "root";
const DB_PASSWORD = process.env.DB_PASSWORD ?? "310720";
const DB_NAME = process.env.DB_NAME ?? "japanese_learning";

const baseConfig = {
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
};

// Connection pool dùng cho application
export const connect = mysql.createPool({
  ...baseConfig,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Tạo database nếu chưa tồn tại
export async function createDatabase() {
  const connection = await mysql.createConnection({
    ...baseConfig,
    multipleStatements: true,
  });

  try {
    console.log(`Checking database "${DB_NAME}"...`);

    const [rows] = await connection.query(
      `
            SELECT SCHEMA_NAME
            FROM INFORMATION_SCHEMA.SCHEMATA
            WHERE SCHEMA_NAME = ?
    `,
      [DB_NAME],
    );

    const databases = rows as Array<{
      SCHEMA_NAME: string;
    }>;

    if (databases.length > 0) {
      console.log(`Database "${DB_NAME}" exists.`);
      console.log(`Dropping database "${DB_NAME}"...`);

      await connection.query(`DROP DATABASE \`${DB_NAME}\``);

      console.log(`✓ Database "${DB_NAME}" dropped.`);
    }

    console.log(`Creating database "${DB_NAME}"...`);

    await connection.query(
      `
            CREATE DATABASE \`${DB_NAME}\`
            CHARACTER SET utf8mb4
            COLLATE utf8mb4_unicode_ci
            `,
    );

    console.log(`✓ Database "${DB_NAME}" created.`);
  } finally {
    await connection.end();
  }
}

export async function getDatabaseConnection() {
  return mysql.createConnection({
    ...baseConfig,
    database: DB_NAME,
    multipleStatements: true,
  });
}

export async function testDatabaseConnection() {
  try {
    const [rows] = await connect.query("SELECT 1 AS connected");

    console.log("✓ MySQL connected:", rows);
  } catch (error) {
    console.error("✗ MySQL connection failed:", error);
    throw error;
  }
}

export async function dropDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT ?? 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });
  try {
    await connection.query(`DROP DATABASE IF EXISTS \`${DB_NAME}\``);
  } finally {
    await connection.end();
  }
}

export { DB_NAME };
