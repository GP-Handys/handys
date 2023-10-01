const Sequelize = require('sequelize')
const connection = require("../database/database")

const User = connection.define("user",
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
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        phone_number: {
            type: Sequelize.INTEGER,
            validator: {
                is: /^(07[789]\d{7})$/,
            }
        },
        is_sys_admin: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        pfp_url: {
            type: Sequelize.STRING
        }
    }
)

module.exports = User