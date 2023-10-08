import { DataTypes, Model } from 'sequelize';
import {connection} from '../database/database';

import {Shop} from './Shop'


class Item extends Model{
   public id! : number;
   public name! : string;
   public description! : string;
   public base_price! : number;
   public discount! : number;
   public rating! : number;
   public quantity! : number;
   public is_customizable! : boolean;
   public img_url? : string | null;
   public is_deleted! : boolean;

}

Item.init(
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
      description: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      base_price: {
         type: DataTypes.FLOAT,
         allowNull: false,
         validate: {
            isFloat: true,
            min: 0,
         },
      },
      discount: {
         type: DataTypes.FLOAT,
         allowNull: true,
         validate: {
            isFloat: true,
            min: 0,
            max: 100, // percentage
         },
      },
      rating: {
         type: DataTypes.INTEGER,
         defaultValue: 1,
         validate: {
            min: 1,
            max: 5,
         },
      },
      quantity: {
         type: DataTypes.INTEGER,
         allowNull: false
      },
      is_customizable: {
         type: DataTypes.BOOLEAN,
         defaultValue: false
      },
      img_url: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      is_deleted: {
         type: DataTypes.BOOLEAN,
         defaultValue: false
      },
   },

   {
      sequelize: connection,
      modelName: 'Item'
   }

);

Item.belongsTo(Shop)
Shop.hasMany(Item)

export  {Item}
