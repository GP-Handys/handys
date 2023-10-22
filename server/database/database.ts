import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
dotenv.config();

const DATABASE_NAME = process.env.DATABASE_NAME as string;
const HOST = process.env.HOST as string;
const DATABASE_USERNAME = process.env.DATABASE_USERNAME as string;
const PASSWORD = process.env.PASSWORD as string;

const connection = new Sequelize(DATABASE_NAME, DATABASE_USERNAME, PASSWORD, {
  host: HOST,
  dialect: "mysql",
});

export { connection };
