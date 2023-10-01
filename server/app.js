const express = require("express")
const connection = require('./database/database.js')
require("dotenv").config()
require("./models/Models.js")

const app = express()

async function syncDb() {
    await connection.sync()
}
syncDb()

app.listen(process.env.PORT)