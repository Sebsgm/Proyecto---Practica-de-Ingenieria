import { Request, Response } from "express";
import {checkPassword, hashPassword} from "../Utils/auth";
import User from "../models/User";


export const createUser = async (req: Request, res: Response)  => {

try {
    const { name, email, password } = req.body;

    // verificar si el usuario ya existe
    const userExists = await User.findOne({
        where: { email }
    });

    if (userExists) {
        return res.status(400).json({
        message: "El usuario ya existe"
        });
    }

    // encriptar contraseña
    const hashedPassword = await hashPassword(password);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        progress: 0
    });

    res.status(201).json({
        message: "Usuario creado correctamente",
        user
    });

    } catch (error) {

    res.status(500).json({
        message: "Error al crear usuario",
        error
    });
    
    }

};

export const loginUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    // verificar si el usuario ya existe
    const userExists = await User.findOne({
        where: { email }
    });

    if (!userExists) {
        return res.status(401).json({
        message: "El usuario no existe"
        });
    }

    //comprobar contraseña
    const hash = userExists.password;
    const isMatch = await checkPassword(password, hash);

    if (!isMatch) {
        return res.status(401).json({
        message: "La contraseña incorrecta"
        });
    }

    res.send('Autenticación exitosa');

}