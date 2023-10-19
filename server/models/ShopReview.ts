import { DataTypes, Model } from "sequelize";
import { connection } from "../database/database";
import { Shop } from "./Shop";
import { User } from "./User";

class ShopReview extends Model {
  public id!: number;
    public content!: string;
    public rating!: number;
    public userId!: number;

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
    modelName: "shop_review",
  }
);

Shop.hasMany(ShopReview)
ShopReview.belongsTo(Shop)

User.hasMany(ShopReview)
ShopReview.belongsTo(User)

export { ShopReview };