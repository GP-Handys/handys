const express = require("express")
require("dotenv").config()
const connection = require('./database/database.js')
require("./models/user.js")
require("./models/Post.js") // fixed a typo 

const app = express()

connection.sync()
app.listen(process.env.PORT)