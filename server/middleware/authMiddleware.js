require('dotenv').config()
const jwt = require("jsonwebtoken")
const tokenValidate = (req, res, next) => {
    const token = req.get("Authorization");

    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,decodeToken) => {
            if (err) {
                res.sendStatus(401)
            } else {
                next();
            }
        })
    }
    else {
        res.sendStatus(401)
    }
}

module.exports = { tokenValidate };