import { DataTypes, Model } from "sequelize";
import { connection } from "../database/database";

import { Shop } from "./Shop";

class Item extends Model {
  forEach(arg0: (element: any) => void) {
    throw new Error("Method not implemented.");
  }
  public id!: number;
  public name!: string;
  public description!: string;
  public base_price!: number;
  public rating!: number;
  public quantity!: number;
  public customization!: string;
  public img_url?: string | null;
  public is_deleted!: boolean;
  public shopId!: number;
}

Item.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    base_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: true,
        min: 0,
      },
    },
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 5,
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    customization: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    img_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },

  {
    sequelize: connection,
    modelName: "item",
  }
);

Item.belongsTo(Shop);
Shop.hasMany(Item);

export { Item };
