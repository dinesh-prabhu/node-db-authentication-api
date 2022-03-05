import jwt from "jsonwebtoken";
import config from "../config.js";

export default function PasswordAuth({ userNameField = 'username', passwordField = 'password' }, checkUser) {
    
    this.userNameField = userNameField;
    this.passwordNameField = passwordField;
    this.checkUser = checkUser;

    PasswordAuth.prototype.authenticate = function(authHandler, options) {
        let self = this;
        return function (req, res, next) {
            let data = req.body;
            console.log(data);
            let userName = data[self.userNameField];
            let password = data[self.passwordNameField];

            if (!userName || !password) {
                return res.send({ status: "error", message: "Username or Password is empty." });
            }
            self.checkUser(userName, password, function(err, user) {
                if (err) {
                    return res.send({ status: "error", message: err.message });
                }
                res.send({
                    status: "success",
                    "access-token": jwt.sign(user, config.JWT_KEY, { expiresIn: "1h" })
                });
                return next();
            });
        }
    }
}