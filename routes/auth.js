import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config.js";
import User from "../models/User.js";

const router = express.Router();

const checkAndRegisterUser = async ({ firstName, lastName, email, age, password }) => {
    let user = await User.exists({ email });
    let res = {};
    if(user && "_id" in user) {
        res.status = "error";
        res.message = "User already exists.";
    } else {
        let hash = await bcrypt.hash(password, 10);
        user = new User({ firstName, lastName, email, age, password: hash });
        await user.save();
        res.status = "success";
    }
    return res;
}

const login = async ({ email, password }) => {
    let res = {};
    try {
        let user = await User.findOne({ email });
        console.log(user);
        if(!user) {
            res.status = "error";
            res.message = "User not found.";
        } else if(await bcrypt.compare(password, user.password)) {
            res.status = "success";
            res["access-token"] = jwt.sign(user.toJSON(), config.JWT_KEY, { expiresIn: "1h" });
        } else {
            res.status = "error";
            res.message = "Invalid password.";
        }
    } catch(err) {
        res.status = "error";
        res.message = err.message;
    }
    return res;
}

router.use(express.json());

router.post("/register", async (req, res) => {
    res.send(await checkAndRegisterUser(req.body));
});
router.post("/login", async (req, res) => {
    res.send(await login(req.body));
});

export default router;