import { DataTypes, Model } from 'sequelize';
import {connection} from '../database/database';
import {Item} from './Item'

class Category extends Model{
   public id! : number
   public category_number! : number;
   public is_approved! : boolean;
}

Category.init(
   {
      id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
         },
         caregoryName: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         is_approved: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
         },
   }, 
      {
         sequelize: connection,
         modelName: 'Item'
      }
)

//M:N
Item.belongsToMany(Category, {through: "item_category"})
Category.belongsToMany(Item, {through: "item_category"})

export {Category}