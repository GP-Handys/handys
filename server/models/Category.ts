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
      },
      is_approved: {
         type: Sequelize.BOOLEAN,
         defaultValue: false
      }
   }, 
   {
      timestamps: false
   }
)

//M:N
Item.belongsToMany(Category, {through: "item_category"})
Category.belongsToMany(Item, {through: "item_category"})

export {Category}