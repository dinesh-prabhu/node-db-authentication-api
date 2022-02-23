import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: Number,
    email: { type: String, required: true, unique: true },
    password: {type: String}
});

userSchema.set("toJSON", {
    versionKey: false,
    transform: function(_doc, ret) {
        return {
            firstName: ret.firstName,
            email: ret.email
        }
    }
})
const User = mongoose.model("User", userSchema);
export default User;