import { DataTypes, Model } from "sequelize";
import { connection } from "../database/database";

class Wishlist extends Model {
  public user_id!: number;
  public item_id!: number;
}

Wishlist.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  },
  {
    sequelize: connection,
    modelName: "wishlist",
  }
);

export { Wishlist };
