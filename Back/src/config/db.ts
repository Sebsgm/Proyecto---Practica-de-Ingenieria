import colors from "colors";
import { Sequelize } from "sequelize";
import { initUserModel } from "../models/User";
import Course, { initCourseModel } from "../models/Course";
import CourseVideo, { initCourseVideoModel } from "../models/CourseVideo";
import CourseFile, { initCourseFileModel } from "../models/CourseFile";

export let sequelize: Sequelize;

const seedCoursesIfEmpty = async () => {
    const n = await Course.count();
    if (n > 0) return;
    await Course.bulkCreate(
        [
            {
                title: "Introducción a la Ciberseguridad",
                description:
                    "Aprende los conceptos básicos para proteger sistemas.",
                sortOrder: 0,
            },
            {
                title: "Hacking Ético",
                description: "Conoce cómo detectar vulnerabilidades.",
                sortOrder: 1,
            },
            {
                title: "Ataques más comunes",
                description: "Conoce los principales ataques a las empresas.",
                sortOrder: 2,
            },
        ],
        { validate: true }
    );
    console.log(colors.green("Cursos iniciales creados (sin videos ni PDFs)."));
};

const connectBD = async () => {
    try {
        sequelize = new Sequelize(
            process.env.URL_BD!,
            process.env.USUARIO_BD!,
            process.env.PASSWORD_BD!,
            {
                host: "localhost",
                dialect: "mysql",
                port: 3306,
            }
        );
        await sequelize.authenticate();
        console.log(colors.cyan.bold("Conexión a la base de datos exitosa"));

        initUserModel(sequelize);
        initCourseModel(sequelize);
        initCourseVideoModel(sequelize);
        initCourseFileModel(sequelize);

        Course.hasMany(CourseVideo, {
            foreignKey: "courseId",
            as: "videos",
            onDelete: "CASCADE",
        });
        CourseVideo.belongsTo(Course, { foreignKey: "courseId" });
        Course.hasMany(CourseFile, {
            foreignKey: "courseId",
            as: "files",
            onDelete: "CASCADE",
        });
        CourseFile.belongsTo(Course, { foreignKey: "courseId" });

        await sequelize.sync();
        await seedCoursesIfEmpty();
    } catch (error) {
        console.error(
            colors.bgRed.white.bold("Error al conectar a la base de datos:"),
            error
        );
        process.exit(1);
    }
};

export default connectBD;
