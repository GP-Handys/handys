import { DataTypes, Model } from "sequelize";
import { connection } from "../database/database";

class Cart extends Model {
  public id!: number;
  public user_id!: number;
  public shop_id!: number;
  public item_id!: number;
  public quantity!:number;
  public customization!:string;
}

Cart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    shop_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue:1
    },
    customization: {
      type: DataTypes.STRING,
      allowNull:true
    },
  },
  {
    sequelize: connection,
    modelName: "cart",
  }
);

export { Cart };
