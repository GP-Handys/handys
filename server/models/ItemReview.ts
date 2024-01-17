import { DataTypes, Model, Sequelize } from "sequelize";
import { connection } from "../database/database";
import { Item } from "./Item";
import { User } from "./User";

class ItemReview extends Model {
  public id!: number;
  public rating!: number;
  public userId!: number;
}

ItemReview.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    }
  },
  {
    sequelize: connection,
    modelName: "item_review",
  }
);

Item.hasMany(ItemReview);
ItemReview.belongsTo(Item);

User.hasMany(ItemReview);
ItemReview.belongsTo(User);

export { ItemReview };
