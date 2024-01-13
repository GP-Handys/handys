import { DataTypes, Model } from "sequelize";
import { connection } from "../database/database";
import { User } from "./User";
import { Item } from "./Item";
import { Shop } from "./Shop";

class Order extends Model {
  public id!: number;
  public street_name!: string;
  public apt_number!: string;
  public floor!: string;
  public phone_number!: string;
  public price!: number;
  public building_number!:string;
  public instructions!:string;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    street_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apt_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    floor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    building_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    instructions: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone_number: {
      type: DataTypes.INTEGER,
      validate: {
        is: /^(07[789]\d{7})$/,
      },
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    modelName: "order",
  }
);

class ItemOrder extends Model {
  public quantity!: number;
  public customaization!: number;
}

ItemOrder.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    customization: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: connection,
    modelName: "item_orders",
  }
);

Order.belongsTo(Shop);
Shop.hasMany(Order);

Order.belongsTo(User);
User.hasMany(Order);

Item.belongsToMany(Order, { through: ItemOrder, as: "orders" });
Order.belongsToMany(Item, { through: ItemOrder, as: "items" });

export { Order, ItemOrder };
