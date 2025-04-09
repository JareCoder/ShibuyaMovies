import { Sequelize } from "sequelize";

const database = new Sequelize({
    dialect: "sqlite",
    storage: "../movies.db",
    logging: false,
})

export default database;