import { DataTypes, Model } from 'sequelize';
import {connection} from '../database/database';

class User extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public phone_number!: number;
    public is_sys_admin!: boolean;
    public pfp_url?: string | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
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
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone_number: {
            type: DataTypes.INTEGER,
            validate: {
                is: /^(07[789]\d{7})$/,
            },
        },
        is_sys_admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        pfp_url: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize: connection,
        modelName: 'User',
    }
);

export {User}
