const Sequelize = require("sequelize")
const connection = require("../database/database");
const Item = require("./Item");


const Category = connection.define("category", {
      id: {
         type: Sequelize.INTEGER,
         primaryKey: true,
         autoIncrement: true,
      },
      caregoryName: {
         type: Sequelize.STRING,
         allowNull: false,
      }
   }
)

Item.belongsTo(Category)

module.exports = Category