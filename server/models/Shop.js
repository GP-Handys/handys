const Sequelize = require("sequelize");
const connection = require("../database/database");
const User = require("./User");


const Shop = connection.define("shop", {
   id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
   },
   name: {
      type:Sequelize.STRING,
      allowNull: false
   },
   is_premium: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
   },
   is_deleted: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
   },
   pfp_url: {
      type: Sequelize.STRING,
      allowNull: true
   }
})

Shop.belongsTo(User)
User.hasMany(Shop)

module.exports = Shop