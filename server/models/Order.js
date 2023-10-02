const Sequelize = require('sequelize')
const connection = require("../database/database")
const User = require('./User')
const Item = require('./Item')
const Shop = require("./Shop")

const Order = connection.define("order", {
      id: {
         type: Sequelize.INTEGER,
         primaryKey: true,
         autoIncrement: true,
      },
      delivery_address: {
         type : Sequelize.STRING,
         allowNull: false,
      },
      payment_method: {
         type: Sequelize.STRING,
         allowNull: false
      },
      price: {
         type: Sequelize.DOUBLE,
         allowNull: false
      },
      is_confirmed: {
         type: Sequelize.BOOLEAN,
         defaultValue: false
      }
   }
)

const ItemOrder = connection.define("item_orders", {
   quantity: {
     type: Sequelize.INTEGER,
     allowNull: false,
   }
 });

Order.belongsTo(Shop)
Shop.hasMany(Order)

Order.belongsTo(User)
User.hasMany(Order)

Item.belongsToMany(Order, {through: "item_orders"})
Order.belongsToMany(Item, {through: "item_orders"})

module.exports = Order