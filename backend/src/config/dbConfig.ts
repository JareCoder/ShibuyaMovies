import { Sequelize } from "sequelize";
import path from "path";
import fs from "fs";

const storagePath = process.env.DATABASE_PATH || "../movies.db";

// Ensure the directory for the database file exists
const dir = path.dirname(storagePath);
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

const database = new Sequelize({
    dialect: "sqlite",
    storage: storagePath,
    logging: false,
})

export default database;