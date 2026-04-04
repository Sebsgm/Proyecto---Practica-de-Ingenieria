import { DataTypes, Model } from "sequelize";
import { Sequelize } from "sequelize";

//Interface para tipar los atributos del usuario

interface IUser {
    id?: number;
    name: string;
    email: string;
    password: string;
    progress?: number;
}

// Clase del modelo
class User extends Model<IUser> implements IUser {

    declare id : number;
    declare name : string;
    declare email : string;
    declare password : string;
    declare progress : number;

}

// Función para inicializar el modelo

export const initUserModel = (sequelize: Sequelize) => {

User.init(
    {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    progress: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }

    },
    {
        sequelize,
        tableName: "users",
        timestamps: false
    }
);

    return User;
};

export default User;