const Sequelize = require("sequelize");
const connection = require("../database/database");

const Item = connection.define("item", 
   {
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
      basePrice: {
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
         allowNull: true,
         validate: {
            min: 0,
            max: 5,
         },
      },
      inStock: {
       type: Sequelize.BOOLEAN,
       allowNull: false,
         defaultValue: false,
      },
      isCustomizable: {
         type: Sequelize.BOOLEAN,
         allowNull: false,
      },
      imgUrl: {
         type: Sequelize.STRING,
         allowNull: true,
      },
   },
)


module.exports = Item