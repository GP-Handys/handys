import { DataTypes, Model } from 'sequelize';
import { connection } from "../database/database"
import { User } from "./User"

class Post extends Model {
    public id!: number;
    public title!: string;
    public content!: string;
    public img_url?: string | null;
    public votes!: number;
    public is_resolved!: boolean;
    public is_first_post!: boolean;
    public is_deleted!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  
Post.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      img_url: {
        type: DataTypes.STRING,
      },
      votes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      is_resolved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_first_post: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize: connection,
      modelName: 'Post',
    }
  );

// A user has many posts. A post belongs to many users.
User.hasMany(Post)
Post.belongsTo(User)

// A post has many children posts. A child post belongs to one post. 
Post.hasMany(Post, { as: 'ChildPosts', foreignKey: 'parentId' });
Post.belongsTo(Post, { as: 'ParentPost', foreignKey: 'parentId' });

export {Post}
