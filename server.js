import express from "express";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const app = express();

const config = require("./config.json");
const PORT = config.development.port || 3000;

app.get("/", (req, res) => {
    res.send({
        message: "Hello World"
    });
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});