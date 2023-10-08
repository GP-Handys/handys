import { DataTypes, Model, Optional } from 'sequelize';
import {connection} from '../database/database';
import { User } from './User';

interface TicketAttributes {
  id: number;
  content: string;
  is_resolved: boolean;
}

interface TicketCreationAttributes extends Optional<TicketAttributes, 'id'> {}

class Ticket
  extends Model<TicketAttributes, TicketCreationAttributes>
  implements TicketAttributes {
  public id!: number;
  public content!: string;
  public is_resolved!: boolean;

  // Timestamps (createdAt and updatedAt) are automatically created by Sequelize.
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
    modelName: 'ticket',
  }
);

Ticket.belongsTo(User);
User.hasMany(Ticket);

export { Ticket };