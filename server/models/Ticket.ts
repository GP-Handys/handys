import { DataTypes, Model, Optional } from "sequelize";
import { connection } from "../database/database";
import { User } from "./User";

class Ticket extends Model {
  public id!: number;
  public content!: string;
  public is_resolved!: boolean;
  public userId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Ticket.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.STRING,
    },
    is_resolved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: connection,
    modelName: "ticket",
  }
);

Ticket.belongsTo(User);
User.hasMany(Ticket);

export { Ticket };
