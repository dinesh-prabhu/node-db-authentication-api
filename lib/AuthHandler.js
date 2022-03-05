import jwt from "jsonwebtoken";
import config from "../config.js";

function AuthHandler() {
    AuthHandler.prototype.useAuth = function(authObj) {
        this.authObj = authObj;
        return this;
    }
    AuthHandler.prototype.authenticate = function(options) {
        return this.authObj.authenticate(this, options);
    }
    AuthHandler.prototype.verifyToken = function({ nonSecurePaths }) {
        this.nonSecurePaths = nonSecurePaths;
        let self = this;
        return (req, res, next) => {
            if(!self.nonSecurePaths.includes(req.path)) {
                try {
                    let token = req.body.token || req.query.token || req.header["access-token"];
                    if(!token) {
                        throw new Error("A token is needed for authentication");
                    }
                    req.user = jwt.verify(token, config.JWT_KEY);
                } catch (err) {
                    return res.send({
                        status: "error",
                        message: err.message
                    });
                }
            }
            return next();
        }
    }
}

export default new AuthHandler();