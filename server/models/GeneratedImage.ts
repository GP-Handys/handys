import { DataTypes, Model } from "sequelize";
import { connection } from "../database/database";
import { User } from "./User";

class GeneratedImage extends Model {
  public id!: number;
  public image_url!: string;
  public prompt!: string;
  public userId!: number;
}

GeneratedImage.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    prompt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    modelName: "generated_image",
  }
);

GeneratedImage.belongsTo(User);
User.hasMany(GeneratedImage);

export default GeneratedImage;
