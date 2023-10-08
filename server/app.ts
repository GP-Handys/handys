import express from 'express'
import { connection } from './database/database'
import * as dotenv from 'dotenv';
dotenv.config()
require("./models/Models.js")

const app = express()

async function syncDb() {
    await connection.sync()
}
syncDb()

import bodyParser from 'body-parser'
import {router} from './routes/index'
app.use(bodyParser.urlencoded({extended:  true}));
app.use(express.json()); 
app.use(router)

app.listen(process.env.PORT)