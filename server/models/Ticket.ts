const Sequelize = require("sequelize");
const connection = require("../database/database");
const User = require("./User")

const Ticket = connection.define("ticket", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: Sequelize.STRING
    },
    is_resolved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
})

Ticket.belongsTo(User)
User.hasMany(Ticket)

export {Ticket}