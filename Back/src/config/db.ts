import colors from 'colors';
import { Sequelize } from "sequelize";
import { initUserModel } from '../models/User';

const connectBD = async () => {
    try {

        const sequelize = new Sequelize(
            process.env.URL_BD, // nombre de la base de datos
            process.env.USUARIO_BD,            // usuario
            process.env.PASSWORD_BD,     // contraseña
            {
                host: "localhost",
                dialect: "mysql",
                port: 3306,
            }
        );
        await sequelize.authenticate();
        console.log(colors.cyan.bold("Conexión a la base de datos exitosa"));
        initUserModel(sequelize);        

    } catch (error) {
        console.error(colors.bgRed.white.bold("Error al conectar a la base de datos:"), error);
        process.exit(1); 
    }
};

export default connectBD;