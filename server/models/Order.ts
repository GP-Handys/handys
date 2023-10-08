import { DataTypes, Model } from "sequelize";
import { connection } from "../database/database";
import { User } from "./User";
import { Item } from "./Item";
import { Shop } from "./Shop";

class Order extends Model {
  public id!: number;
  public delivery_address!: string;
  public payment_method!: string;
  public price!: number;
  public is_confirmed!: boolean;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    delivery_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    is_confirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: connection,
    modelName: "order",
  }
);

class ItemOrder extends Model {
  public quantity!: number;
}

ItemOrder.init(
  {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
