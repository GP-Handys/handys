import express from "express";
import { connection } from "./database/database";
import * as dotenv from "dotenv";
import "./models/Models";
import bodyParser from "body-parser";
import { router } from "./routes/index";
import OpenAI from 'openai';


dotenv.config();

const app = express();
async function syncDb() {
  await connection.sync({ force: false });
}
syncDb();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

app.listen(process.env.PORT);

export { openai };
