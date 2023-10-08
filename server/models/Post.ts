const Sequelize = require('sequelize')
const connection = require("../database/database")
const User = require("./User")

const Post = connection.define("post", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },      
        content: {
            type: Sequelize.STRING,
            allowNull: false
        },
        img_url: {
            type: Sequelize.STRING
        },
        votes: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        is_resolved: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        is_first_post: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        is_deleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    }
)

// A user has many posts. A post belongs to many users.
User.hasMany(Post)
Post.belongsTo(User)

// A post has many children posts. A child post belongs to one post. 
Post.hasMany(Post, { as: 'ChildPosts', foreignKey: 'parentId' });
Post.belongsTo(Post, { as: 'ParentPost', foreignKey: 'parentId' });

export {Post}
