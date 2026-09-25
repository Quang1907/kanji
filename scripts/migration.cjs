const fs = require("fs");
const path = require("path");

const type = process.argv[2];
const name = process.argv[3];

const allowedTypes = ["create", "update", "delete"];

if (!type || !name) {
    console.error("Usage:");
    console.error("  npm run db:create users");
    console.error("  npm run db:update users");
    console.error("  npm run db:delete users");
    process.exit(1);
}

if (!allowedTypes.includes(type)) {
    console.error(`Invalid type: ${type}`);
    console.error(`Allowed types: ${allowedTypes.join(", ")}`);
    process.exit(1);
}

const migrationsDir = path.join(
    process.cwd(),
    "database",
    "migrations"
);

if (!fs.existsSync(migrationsDir)) {
    fs.mkdirSync(migrationsDir, { recursive: true });
}

const safeName = name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "");

if (!safeName) {
    console.error("Invalid migration name.");
    process.exit(1);
}

const files = fs.readdirSync(migrationsDir);

const numbers = files
    .map((file) => {
        const match = file.match(/^(\d{3})_/);
        return match ? Number(match[1]) : 0;
    })
    .filter((number) => number > 0);

const nextNumber =
    numbers.length > 0
        ? Math.max(...numbers) + 1
        : 1;

const number = String(nextNumber).padStart(3, "0");

const filename = `${number}_${type}_${safeName}.sql`;
const filepath = path.join(migrationsDir, filename);

const content = `-- Migration: ${filename}

`;

fs.writeFileSync(filepath, content);

console.log(`✅ Created: database/migrations/${filename}`);
