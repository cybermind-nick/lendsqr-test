/* Database Configuration File */

import { Transaction } from "./transaction.entity";
import { User } from "./user.entity";
import { DataSource } from "typeorm";

const mysqlDevDB = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "lendsqr",
    logging: true,
    synchronize: true,
    // entities: [User, Transaction],
    entities:  [__dirname + "/../**/*.entity.{js,ts}"],
    migrations: []
})

const mysqlTestDB = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "lendsqr",
    logging: true,
    synchronize: true,
    // entities: [User, Transaction],
    entities:  [__dirname + "/../**/*.entity.{js,ts}"],
    migrations: []
})

const mysqlProdDB = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "test",
    password: "test",
    database: "test"
})



const config: { [key: string]: DataSource} = {
    development: mysqlDevDB,

    test: mysqlTestDB,

    production: mysqlProdDB
}

export default config;