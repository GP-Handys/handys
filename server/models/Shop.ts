import { DataTypes, Model } from "sequelize";
import { connection } from "../database/database";
import { User } from "./User";

class Shop extends Model {
  public id!: number;
  public name!: string;
  public rating!: number;
  public is_premium!: boolean;
  public is_deleted!: boolean;
  public is_approved!: boolean;
  public pfp_url?: string | null;
  public bio!: string;
  public socialMediaLink!: string;
  public userId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Shop.init(
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
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      validate: {
        min: 1,
        max: 5,
      },
    },
    is_premium: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_approved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    pfp_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    socialMediaLink: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
  },
  {
    sequelize: connection,
    modelName: "shop",
  }
);

Shop.belongsTo(User);
User.hasMany(Shop);

export { Shop };
