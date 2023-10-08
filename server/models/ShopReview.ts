import { DataTypes, Model } from 'sequelize';
import { connection } from '../database/database';
import { Shop } from './Shop';
import { User } from './User';

class ShopReview extends Model {
  public id!: number;
  public content!: string;
  public rating!: number;
}

ShopReview.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
  },
  {
    sequelize: connection,
    modelName: 'shop_reviews',
  }
);

ShopReview.belongsTo(Shop);
Shop.hasMany(ShopReview);

ShopReview.belongsTo(User);
User.hasMany(ShopReview);

export { ShopReview };