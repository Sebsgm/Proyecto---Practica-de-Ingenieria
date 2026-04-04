import { Request, Response } from "express";
import {checkPassword, hashPassword} from "../Utils/auth";
import User from "../models/User";
import jwt from "jsonwebtoken";

const getSecret = () => process.env.JWT_SECRET || "dev-cambiar-en-produccion";


export const createUser = async (req: Request, res: Response)  => {

try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
        return res.status(400).json({ message: "El usuario ya existe" });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        progress: 0
    });

    res.status(201).json({ message: "Usuario creado correctamente", user });

    } catch (error) {
    res.status(500).json({ message: "Error al crear usuario", error });
    }

};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const userExists = await User.findOne({ where: { email } });

    if (!userExists) {
        return res.status(401).json({ message: "El usuario no existe" });
    }

    const isMatch = await checkPassword(password, userExists.password);

    if (!isMatch) {
        return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Generar JWT con rol "user" — expira en 7 dias
    const token = jwt.sign(
        { id: userExists.id, email: userExists.email, role: "user" },
        getSecret(),
        { expiresIn: "7d" }
    );

    res.json({
        message: "Autenticación exitosa",
        token,
        user: {
            id: userExists.id,
            name: userExists.name,
            email: userExists.email,
        }
    });
}
