require('dotenv').config()

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const jwtDecode = require("jwt-decode");

async function signup(req, res) {
    let { id, name, email, password, phone_number } = req.body;
    try {
        let user = await User.findOne({ where: { email: email } })
        if (user) {
            res.status(401).send("Invalid credentials")
        }
        else {
            let data = { id, name, email, password: await bcrypt.hash(password, 10), phone_number }
            user = await User.create(data)
            if (user) {
                res.status(200).send("User created sucesfully")
            }
            else {
                res.status(500).send("Failed to create user")
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}

async function login(req, res) {
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

async function getUser(req, res) {
    let id = req.params.id
    let user = await User.findOne({ where: { id: id } })

    if (user) {
        res.status(200).send(user)
    } else {
        res.sendStatus(404)
    }
}

async function editUser(req, res) {
    try {
        
        const decodedtoken = jwtDecode(req.get("Authorization"));
        let path_id = req.params.id
        let user = await User.findOne({ where: { id: path_id } })
        let { id, name, email, password, phone_number } = req.body;
        let data = { id, name, email, password: await bcrypt.hash(password, 10), phone_number }

        if(user==null){
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
            res.sendStatus(403)
        }
    } catch (err) {
        res.status(500).send(err)
    }
}

async function deleteUser(req, res) {
    try {
        const decodedtoken = jwtDecode(req.get("Authorization"));
        let id = req.params.id
        let token_userid = decodedtoken.id;
        let user = await User.findOne({ where: { id: id } })

        if(user==null){
            res.sendStatus(404)
            return;
        }
        

        if (user.is_sys_admin || id == token_userid) {
            
            let user = await User.destroy({ where: { id: id } })
            if (user) {
                res.status(200).send("User deleted")
            }
            else {
                res.status(401).send("Failed to delete user")
            }
        } else {
            res.sendStatus(403)
        }
    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports = { login, signup, getUser, editUser, deleteUser }