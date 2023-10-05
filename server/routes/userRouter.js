require('dotenv').config()

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const { extractUserFromJwt } = require("../utils/tokenUtils")

module.exports.signup = async (req, res) => {
    const { name, email, password, phone_number } = req.body;
    try {
        let user = await User.findOne({ where: { email: email } })
        if (user) {
            res.status(400).json("User already exists")
        }
        else {
            user = await User.create({
                name, 
                email,
                password: await bcrypt.hash(password, 10),
                phone_number
            })
            if (user) {
                res.status(200).json("User created successfully")
            }
            else {
                res.status(500).json("Failed to create user")
            }
        }
    }
    catch (error) {
        res.status(500).json(error)
    }
}

module.exports.login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ where: { email: email } })

        if (user == null) {
            res.status(401).send("Invalid credentials")
        }
        else {
            const isCorrectPassword = await bcrypt.compare(password, user.password)
            if (isCorrectPassword) {
                const id = user.id
                const token = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
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
        const id = req.params.id
        const user = await User.findByPk(id)

        if (user) {
            res.status(200).json(user)
        } else {
            res.sendStatus(404)
        }
    }
    catch (error) {
        res.status(500).json(error)
    }
}

module.exports.updateUser = async (req, res) => {
    try {
        const jwt = req.get("Authorization")
        const userIdToken = extractUserFromJwt(jwt)
        const userId = req.params.id
        const user = await User.findByPk(userId)
        const { name, email, password, phone_number } = req.body;
        const data = { name, email, password: await bcrypt.hash(password, 10), phone_number }

        if (user == null) {
            res.sendStatus(404)
            return;
        }

        if (user.is_sys_admin || userIdToken == user.id) {
            user = await user.update(data)
            if (user) {
                res.status(200).json("user modified")
            }
            else {
                res.sendStatus(500)
            }
        }
        else {
            res.sendStatus(403)
        }
    } catch (err) {
        res.status(500).josn(err)
    }
}

module.exports.deleteUser = async (req, res) => {
    try {
        const jwt = req.get("Authorization")
        const userIdToken = extractUserFromJwt(jwt)
        const id = req.params.id
        const user = await User.findByPk(id)

        if (user == null) {
            res.sendStatus(404)
            return;
        }

        if (user.is_sys_admin || id == userIdToken) {
            const user = await user.destroy()
            if (user) {
                res.status(200).json("User deleted")
            }
            else {
                res.status(500).json("Failed to delete user")
            }
        } else {
            res.sendStatus(403)
        }
    } catch (err) {
        res.status(500).json(err)
    }
}