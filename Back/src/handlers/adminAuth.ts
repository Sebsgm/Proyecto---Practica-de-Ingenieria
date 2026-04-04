import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

const getSecret = () => process.env.JWT_SECRET || "dev-cambiar-en-produccion";

export const adminLogin = (req: Request, res: Response) => {
    const { email, password } = req.body as { email?: string; password?: string };
    const adminEmail = process.env.ADMIN_EMAIL?.trim();
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || adminPassword === undefined || adminPassword === "") {
        return res.status(500).json({
            message:
                "Panel admin no configurado: define ADMIN_EMAIL y ADMIN_PASSWORD en .env",
        });
    }

    if (email !== adminEmail || password !== adminPassword) {
        return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const token = jwt.sign({ role: "admin" }, getSecret(), { expiresIn: "8h" });
    res.json({ token });
};
