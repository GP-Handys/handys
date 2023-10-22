import { DataTypes, Model } from "sequelize";
import { connection } from "../database/database";
import { Item } from "./Item";

class Category extends Model {
  public id!: number;
  public category_name!: string;
  public pfp_url?: string | null;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    category_pfp: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: connection,
    modelName: "category",
  }
);

//M:N
Item.belongsToMany(Category, { through: "item_category" });
Category.belongsToMany(Item, {
  through: "item_category",
  onDelete: "cascade",
  hooks: true,
});

export { Category };
