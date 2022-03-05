import express from "express";
import mongoose from "mongoose";
import config from "./config.js";
import authRouter from "./routes/auth.js";
import homeRouter from "./routes/index.js";

const app = express();
const port = config.port || 3000;

app.use("/", authRouter, homeRouter);

const connect = async () => {
    await mongoose.connect(config.db_url);
}
connect().catch(err => console.log(err));

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});