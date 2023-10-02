const Sequelize = require('sequelize')
const connection = require("../database/database")
const User = require('./User')
const Item = require('./Item')

const Order = connection.define("order", {
      id: {
         type: Sequelize.INTEGER,
         primaryKey: true,
         autoIncrement: true,
      },
      createdAt: {
         type: Sequelize.DATE,
         allowNull: false,
      },
      address: {
         type : Sequelize.STRING,
         allowNull: false,
      },
      paymentMethod: {
         type: Sequelize.STRING,
         allowNull: false
      }
   }
)

Order.belongsTo(User)
Order.hasMany(Item)

module.exports = Order