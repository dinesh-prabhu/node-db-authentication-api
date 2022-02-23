import express from "express";
import mongoose from "mongoose";
import config from "./config.js";
import authRouter from "./routes/auth.js";

const app = express();
const PORT = config.port || 3000;

app.use("/", authRouter);

const connect = async () => {
    await mongoose.connect(config.db_url);
}
connect().catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});