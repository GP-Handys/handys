require('dotenv').config()

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

async function signup(req, res) {
    let { id, name, email, password, phone_number } = req.body;
    try {
        const user = await User.findOne({ where: { email: email } })
        if (user) {
            res.status(401).send("Invalid credentials")
        }
        else {
            let data = { id, name, email, password: await bcrypt.hash(password, 10), phone_number }
            user = User.create(data)

            if (user) {
                res.status(200).send("User created sucesfully")
            }
            else {
                res.status(500).send("Failed to create user")
            }
        }
    }
    catch (error) {
        res.status(500).send(error)
    }
}

async function login(req, res) {
    let { email, password } = req.body
    try {
        let user = await User.findOne({ where: { email: email } })
        
        if (user.email=="") {
            res.status(401).send("Invalid credentials")
        }
        else {
            let isCorrectPassword = await bcrypt.compare(password, user.password)
            if (isCorrectPassword) {
                let token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
                res.send(token)
            }
            else {
                res.status(401).send("Invalid credentials")
            }
        }
    }
    catch (error) {
        res.Status(500).send(error)
    }
}

module.exports = { login, signup}