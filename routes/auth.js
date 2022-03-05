import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import authHandler from "../lib/AuthHandler.js";
import PasswordAuth from "../lib/PasswordAuth.js";

const router = express.Router();
authHandler.useAuth(new PasswordAuth({ userNameField: "email"}, async (email, password, callback) => {
    try {
        let user = await User.findOne({ email });
        if(!user) {
            throw new Error("User not found.");
        } else if(await bcrypt.compare(password, user.password)) {
            callback(null, user.toJSON())
        } else {
            throw new Error("Invalid password.");
        }
    } catch(err) {
        callback(err, null);
    }
}));

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

router.use(express.json());
router.use(express.static('public'));
router.use(authHandler.verifyToken({
    nonSecurePaths: ["/login", "/authenticate", "/register"]
}));

router.get("/login", (req, res) => {
    res.redirect("/index.html");
});
router.post("/register", async (req, res) => {
    res.send(await checkAndRegisterUser(req.body));
});
router.post("/authenticate", authHandler.authenticate());

export default router;