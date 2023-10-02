const Sequelize = require("sequelize");
const connection = require("../database/database");
const Item = require("./Item")
const User = require("./User")

const ItemReview = connection.define('item_reviews', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    },
    stars: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validator: {
            min: 1,
            max: 5
        }
    }
})

ItemReview.belongsTo(Item)
Item.hasMany(ItemReview)

ItemReview.belongsTo(User)
User.hasMany(ItemReview)

module.exports = ItemReview