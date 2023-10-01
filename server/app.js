require("dotenv").config()
require("./models/User.js")
require("./models/Post.js")
const express = require("express")
const connection = require('./database/database.js')
const cookiesParser = require('cookie-parser')
const bodyParser = require('body-parser')
const routes = require("./routes/index.js")
require("./models/Item.js")
require("./models/Shop.js")

const app = express()

app.use(bodyParser.urlencoded({extended:  true}));
app.use(express.json()); 
app.use(cookiesParser())
app.use(routes)

connection.sync()
app.listen(process.env.PORT)