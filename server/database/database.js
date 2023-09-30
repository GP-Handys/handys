const Sequelize = require('sequelize')
require("dotenv").config({ path: '../.env' })

const DATABASE_NAME = process.env.DATABASE_NAME
const HOST = process.env.HOST
const DATABASE_USERNAME = process.env.DATABASE_USERNAME
const PASSWORD = process.env.PASSWORD

const connection = new Sequelize(DATABASE_NAME, DATABASE_USERNAME, PASSWORD, {
  host: HOST,
  dialect: 'mysql',
});

module.exports = connection