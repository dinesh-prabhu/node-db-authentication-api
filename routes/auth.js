import express from "express";
import User from "../models/User.js";

const router = express.Router();

const checkAndRegisterUser = async (data) => {
    let user = await User.exists({email: data.email});
    if(user && "_id" in user) {
        return {
            status: "error",
            message: "User already exists!"
        }
    }
    user = new User({
        name: data.name,
        email: data.email,
        age: data.age
    });
    await user.save();
    return user;
}

router.use("/register", express.json());
router.post("/register", async (req, res) => {
    let resJSON = await checkAndRegisterUser(req.body);
    res.send(resJSON);
});

export default router;