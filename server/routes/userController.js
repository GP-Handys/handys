require('dotenv').config()

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

async function signup(req, res) {
    let { id, name, email, password, phone_number } = req.body;
    try {
        const user = await User.findOne({ where: { email: email } })
        if (user) {
            res.send("This email is used before")
        }
        else {
            let data = { id, name, email, password: await bcrypt.hash(password, 10), phone_number }
            user = User.create(data)

            if (user) {
                res.send("User created")
            }
            else {
                res.send("User doesn't created")
            }
        }
    }
    catch (error) {
        res.send(error)
    }
}

async function login(req, res) {
    let { email, password } = req.body
    try {
        let user = await User.findOne({ where: { email: email } })
        
        if (user.email=="") {
            res.send("User not found")
        }
        else {
            let isCorrectPassword = await bcrypt.compare(password, user.password)
            if (isCorrectPassword) {
                let token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
                res.cookie('jwt', token)
                res.send("User login sucessfully")
            }
            else {
                res.send("Wrong password")
            }
        }
    }
    catch (error) {
        res.send(error)
    }
}

function logout(req,res){
    res.cookie('jwt', '', { expiresIn: '1s' })
    res.send("User logout sucessfully")
}

module.exports = { login, signup ,logout}