const fs = require("fs");
const path = require("path");

const type = process.argv[2];
const name = process.argv[3];

const typeMap = {
    create: "insert",
    update: "update",
    delete: "delete",
};

const allowedTypes = Object.keys(typeMap);

if (!type || !name) {
    console.error("Usage:");
    console.error("  npm run seed:create levels");
    console.error("  npm run seed:update levels");
    console.error("  npm run seed:delete levels");
    process.exit(1);
}

if (!allowedTypes.includes(type)) {
    console.error(`Invalid type: ${type}`);
    console.error(`Allowed types: ${allowedTypes.join(", ")}`);
    process.exit(1);
}

const seedDir = path.join(
    process.cwd(),
    "database",
    "seed"
);

if (!fs.existsSync(seedDir)) {
    fs.mkdirSync(seedDir, { recursive: true });
}

const safeName = name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "");

if (!safeName) {
    console.error("Invalid seed name.");
    process.exit(1);
}

const files = fs.readdirSync(seedDir);

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

const seedType = typeMap[type];

const filename = `${number}_${seedType}_${safeName}.sql`;
const filepath = path.join(seedDir, filename);

const content = `-- Seed: ${filename}

`;

fs.writeFileSync(filepath, content);

console.log(`✅ Created: database/seed/${filename}`);
