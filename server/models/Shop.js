const Sequelize = require("sequelize");
const connection = require("../database/database");


const Shop = connection.define("shop",
   {
      id: {
         type: Sequelize.INTEGER,
         primaryKey: true,
         autoIncrement: true,
      },
      isPremium: {
         type: Sequelize.BOOLEAN,
            allowNull: false,
      },
      isDeleted: {
         type: Sequelize.BOOLEAN,
            allowNull: false,
      },
      pfpUrl: {
         type: Sequelize.STRING
     }
   }
)


module.exports = Shop