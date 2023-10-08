const Sequelize = require("sequelize");
const connection = require("../database/database");
const Shop = require("./Shop")
const User = require("./User")

const ShopReview = connection.define('shop_reviews', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    },
    rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validator: {
            min: 1,
            max: 5
        }
    }
})

ShopReview.belongsTo(Shop)
Shop.hasMany(ShopReview)

ShopReview.belongsTo(User)
User.hasMany(ShopReview)

export {ShopReview}