require('dotenv').config()

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const jwtDecode = require("jwt-decode");

module.exports.signup = async (req, res) => {
    let { name, email, password, phone_number } = req.body;
    try {
        let user = await User.findOne({ where: { email: email } })
        if (user) {
            res.status(400).send("User already exists")
        }
        else {
            let data = { name, email, password: await bcrypt.hash(password, 10), phone_number }
            user = await User.create(data)
            if (user) {
                res.status(200).send("User created successfully")
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

module.exports.login = async (req, res) => {
    let { email, password } = req.body
    try {
        let user = await User.findOne({ where: { email: email } })

        if (user == null) {
            res.status(401).send("Invalid credentials")
        }
        else {
            let isCorrectPassword = await bcrypt.compare(password, user.password)
            if (isCorrectPassword) {
                let id = user.id
                let token = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
                res.send(token)
            }
            else {
                res.status(401).send("Invalid credentials")
            }
        }
    }
    catch (error) {
        res.status(500).send(error)
    }
}

module.exports.getUser = async (req, res) => {
    try {
        let id = req.params.id
        let user = await User.findByPk(id)

        if (user) {
            res.status(200).send(user)
        } else {
            res.sendStatus(404)
        }
    }
    catch (error) {
        res.status(500).send(error)
    }
}

module.exports.updateUser = async (req, res) => {
    try {
        const decodedtoken = jwtDecode(req.get("Authorization"));
        let userId = req.params.id
        let user = await User.findByPk(userId)
        let { name, email, password, phone_number } = req.body;
        let data = { name, email, password: await bcrypt.hash(password, 10), phone_number }

        if (user == null) {
            res.sendStatus(404)
            return;
        }

        if (user.is_sys_admin || decodedtoken.id == user.id) {
            user = await user.update(data)
            if (user) {
                res.status(200).send("user modified")
            }
            else {
                res.sendStatus(500)
            }
        }
        else {
            res.sendStatus(401)
        }
    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports.deleteUser = async (req, res) => {
    try {
        const decodedtoken = jwtDecode(req.get("Authorization"));
        let id = req.params.id
        let token_userid = decodedtoken.id;
        let user = await User.findByPk(id)

        if (user == null) {
            res.sendStatus(404)
            return;
        }

        if (user.is_sys_admin || id == token_userid) {

            let user = await user.destroy()
            if (user) {
                res.status(200).send("User deleted")
            }
            else {
                res.status(500).send("Failed to delete user")
            }
        } else {
            res.sendStatus(401)
        }
    } catch (err) {
        res.status(500).send(err)
    }
}