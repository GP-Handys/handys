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
   rating: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
      validate: {
         min: 1,
         max: 5,
      },
   },
   is_premium: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
   },
   is_deleted: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
   },
   is_approved: {
      type:Sequelize.BOOLEAN,
      defaultValue: false
   },
   pfp_url: {
      type: Sequelize.STRING,
      allowNull: true
   },
   bio: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   socialMediaLink: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
         isUrl: true
      }
   }
})

Shop.belongsTo(User)
User.hasMany(Shop)

module.exports = Shop