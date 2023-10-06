require('dotenv').config()

const User = require("../models/User")
const Item = require("../models/Item")
const Shop = require("../models/Shop")
const ItemReview = require("../models/ItemReview")
const DB = require("../database/database")
const { extractUserFromJwt } = require("../utils/tokenUtils")

module.exports.addItem = async (req, res) => {
    try {
        const { name, description, base_price, discount, quantity, is_customizable, shopId } = req.body
        const jwt = req.get("Authorization")
        const userId = extractUserFromJwt(jwt)

        const shop = await Shop.findByPk(shopId)
        const user = await User.findByPk(userId)

        if (user.is_sys_admin || shop.userId == userID) {
            const item = await Item.create({
                name,
                description,
                base_price,
                discount,
                quantity,
                is_customizable,
                shopId
            })

            if (item) {
                res.status(200).json("Item created successfully")
            }
            else {
                res.status(500).json("Failed to create item")
            }
        }
        else {
            res.sendStatus(403)
        }
    }
    catch (error) {
        res.status(500).json(error)
    }
}

module.exports.updateItem = async (req, res) => {
    try {
        const { name, description, base_price, discount, quantity, is_customizable, shopId } = req.body
        const itemId = req.params.itemID
        const jwt = req.get("Authorization")
        const userId = extractUserFromJwt(jwt)
        const shop = await Shop.findByPk(shopId)
        const user = await User.findByPk(userId)
        let item = await Item.findByPk(itemId)

        if (item == null || shop == null) {
            res.sendStatus(404)
            return;
        }

        if (user.is_sys_admin || (shop.userId == userId && shopId == item.shopId)) {
            item = await item.update({
                name,
                description,
                base_price,
                discount,
                quantity,
                is_customizable,
                shopId
            })
            if (item) {
                res.status(200).json("item modified")
            }
            else {
                res.sendStatus(500)
            }
        }
        else {
            res.sendStatus(403)
        }

    }
    catch (error) {
        res.status(500).json(error)
    }
}

module.exports.deleteItem = async (req, res) => {
    try {
        const itemId = req.params.itemID
        const jwt = req.get("Authorization")
        const userId = extractUserFromJwt(jwt)
        const user = await User.findByPk(userId)
        let item = await Item.findByPk(itemId)
        if (item == null) {
            res.sendStatus(404)
            return
        }
        const shopId = item.shopId
        const shop = await Shop.findByPk(shopId)

        if (shop == null) {
            res.sendStatus(404)
            return;
        }

        if (user.is_sys_admin || (shop.userId == userId && shopId == item.shopId)) {
            item = await item.destroy()
            if (item) {
                res.status(200).json("Item deleted")
            }
            else {
                res.status(500).json("Failed to delete item")
            }
        }
        else {
            res.send(403)
        }
    }
    catch (error) {
        res.status(500).send(error)
    }
}

module.exports.getItem = async (req, res) => {
    const itemId = req.params.itemID
    try {
        const item = await Item.findByPk(itemId)
        if (item) {
            res.status(200).json(item)
        } else {
            res.sendStatus(404)
        }
    }
    catch (error) {
        res.status(500).json(error)
    }
}

module.exports.addReviewToItem = async (req, res) => {
    //TODO : check if user buy the item
    try {
        const itemId = req.params.itemID
        const jwt = req.get("Authorization")
        const userId = extractUserFromJwt(jwt)
        const { content, rating } = req.body
        const data = { content, rating, userId, itemId }
        const item = await Item.findByPk(itemId)

        if (item == null) {
            res.sendStatus(404)
            return;
        }

        const review = await ItemReview.create(data);
        if (review) {
            res.status(200).json("Review Added successfully")
        }
        else {
            res.sendStatus(500)
        }
    }
    catch (error) {
        res.status(500).json(error)
    }
}

module.exports.removeReviewFromItem = async (req, res) => {
    try {
        const reviewId = req.params.reviewID
        const jwt = req.get("Authorization")
        const userId = extractUserFromJwt(jwt)
        const user = await User.findByPk(userId)
        let review = await User.findByPk(reviewId)

        if (review == null) {
            res.sendStatus(404)
            return;
        }

        if (user.is_sys_admin || userId == review.userId) {
            review = await review.destroy()
            if (review) {
                res.status(200).json("Review removed successfully ")
            }
            else {
                res.sendStatus(500)
            }
        }
        else {
            res.sendStatus(404)
        }
    }
    catch (error) {
        res.status(500).json(error)
    }
}

module.exports.searchItem = async (req, res) => {
    //TODO : add search with category
    try {
        const search = req.query.search
        const query = `SELECT * FROM items WHERE name LIKE '%${search}%' OR description LIKE '%${search}%';`
        const searchResult = await DB.query(query)
        if (searchResult) {
            res.status(200).json(searchResult)
        }
        else {
            res.sendStatus(500)
        }
    }
    catch (error) {
        res.status(500).json(error)
    }
}


