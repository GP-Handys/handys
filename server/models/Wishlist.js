const Sequelize = require('sequelize')
const connection = require("../database/database")
const User = require("./User")
const Item = require("./Item")

const Wishlist = connection.define("wishlist", {
    user_id:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    item_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    }
})

module.exports = Wishlist