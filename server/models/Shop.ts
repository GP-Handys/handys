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
  public phone_number!: number;
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
      defaultValue: 0,
      validate: {
        min: 0,
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
      defaultValue: true,
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
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    phone_number: {
      type: DataTypes.STRING,
      validate: {
        is: /^(07[789]\d{7})$/,
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
