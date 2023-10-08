const Sequelize = require('sequelize')
const connection = require("../database/database")

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

export {Wishlist}