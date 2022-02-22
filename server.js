import express from "express";
import mongoose from "mongoose";
import { createRequire } from "module";
import authRouter from "./routes/auth.js";

const require = createRequire(import.meta.url);
const app = express();

const config = require("./config.json");
const PORT = config.development.port || 3000;

app.use("/", authRouter);

const connect = async () => {
    await mongoose.connect(config.development.db_url);
}

connect().catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});