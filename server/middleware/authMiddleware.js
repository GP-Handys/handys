require('dotenv').config()
const jwt = require("jsonwebtoken")
const tokenValidate = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token!="") {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,decodeToken) => {
            if (err) {
                res.status(401).send("You have to login")
            } else {
                next();
            }
        })
    }
    else {
        res.status(401).send("You have to login")
    }
}

module.exports = { tokenValidate };