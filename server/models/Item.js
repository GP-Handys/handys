const Sequelize = require("sequelize");
const connection = require("../database/database");
const Shop = require("./Shop")

const Item = connection.define("item", {
   id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
   },
   name: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   description: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   base_price: {
      type: Sequelize.FLOAT,
      allowNull: false,
      validate: {
         isFloat: true,
         min: 0,
      },
   },
   discount: {
      type: Sequelize.FLOAT,
      allowNull: true,
      validate: {
         isFloat: true,
         min: 0,
         max: 100, // percentage
      },
   },
   rating: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
      validate: {
         min: 1,
         max: 5,
      },
   },
   quantity: {
      type: Sequelize.INTEGER,
      allowNull: false
   },
   is_customizable: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
   },
   img_url: {
      type: Sequelize.STRING,
      allowNull: true,
   },
   is_deleted: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
   }
})

Item.belongsTo(Shop)
Shop.hasMany(Item)

module.exports = Item
