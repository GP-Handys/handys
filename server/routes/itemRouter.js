require('dotenv').config()

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const Item = require("../models/Item")
const Shop = require("../models/Shop")
const ItemReview = require("../models/ItemReview")
const jwtDecode = require("jwt-decode");

module.exports.addItem = async (req, res) => {
    try {
        let { name, description, base_price, discount, quantity, is_customizable, shopID } = req.body
        const decodedtoken = jwtDecode(req.get("Authorization"));
        let userID = decodedtoken.id

        let shop = await Shop.findByPk(shopID)
        let user = await User.findByPk(userID)

        if (user.is_sys_admin || shop.userId == userID) {
            let data = { name, description, base_price, discount, quantity, is_customizable, shopID }
            let item = Item.create(data)

            if (item) {
                res.status(200).send("Item created successfully")
            }
            else {
                res.status(500).send("Failed to create item")
            }
        }
        else {
            res.sendStatus(401)
        }
    }
    catch (error) {
        res.status(500).send(error)
    }
}

module.exports.updateItem = async (req, res) => {
    try {
        let { name, description, base_price, discount, quantity, is_customizable, shopID } = req.body
        let itemID = req.params.itemID
        const decodedtoken = jwtDecode(req.get("Authorization"));
        let userID = decodedtoken.id
        let shop = await Shop.findByPk(shopID)
        let user = await User.findByPk(userID)
        let item = await Item.findByPk(itemID)

        if (item == null) {
            res.sendStatus(404)
            return;
        }

        if (user.is_sys_admin || (shop.userId == userID && shopID == item.shopId)) {
            let data = { name, description, base_price, discount, quantity, is_customizable, shopID }
            item = await item.update(data)
            if (item) {
                res.status(200).send("item modified")
            }
            else {
                res.sendStatus(500)
            }
        }
        else {
            res.sendStatus(401)
        }

    }
    catch (error) {
        res.status(500).send(error)
    }
}

module.exports.deleteItem = async (req, res) => {
    try {
        let itemID = req.params.itemID
        const decodedtoken = jwtDecode(req.get("Authorization"));
        let userID = decodedtoken.id
        let shop = await Shop.findByPk(shopID)
        let user = await User.findByPk(userID)
        let item = await Item.findByPk(itemID)

        if (item == null) {
            res.sendStatus(404)
            return;
        }

        if (user.is_sys_admin || (shop.userId == userID && shopID == item.shopId)) {
            item = item.destroy()
            if (user) {
                res.status(200).send("Item deleted")
            }
            else {
                res.status(500).send("Failed to delete item")
            }
        }
        else {
            res.send(401)
        }
    }
    catch (error) {
        res.status(500).send(error)
    }
}

module.exports.getItem = async (req,res) =>{
    let itemID = req.params.itemID
    try{
        let item = await Item.findByPk(itemID)
        if (item) {
            res.status(200).send(item)
        } else {
            res.sendStatus(404)
        }
    }
    catch (error) {
        res.status(500).send(error)
    }
}

