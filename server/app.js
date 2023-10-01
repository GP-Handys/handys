const express = require("express")
const connection = require('./database/database.js')
require("dotenv").config()
require("./models/Models.js")

const app = express()

async function syncDb() {
    await connection.sync()
}
syncDb()

const bodyParser = require('body-parser')
const Routes = require("./routes/index.js")
app.use(bodyParser.urlencoded({extended:  true}));
app.use(express.json()); 
app.use(Routes)

app.listen(process.env.PORT)