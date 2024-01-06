import { DataTypes, Model } from "sequelize";
import { connection } from "../database/database";

class PostLike extends Model {
  public user_id!: number;
  public post_id!: number;
}

PostLike.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    post_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  },
  {
    sequelize: connection,
    modelName: "post-like",
  }
);

export { PostLike };
