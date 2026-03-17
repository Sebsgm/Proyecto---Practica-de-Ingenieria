import { Router } from "express";
import { body } from "express-validator";
import { createUser, loginUser } from "./handlers";
import { handleInputErrors } from "./middleware/validation";

const router = Router();

// Autenticacion y Registro
router.get('/auth/register',
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('email').isEmail().withMessage('El email no es válido'), 
    body('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
    handleInputErrors,
    createUser);

router.post('/auth/login', 
    body('email').isEmail().withMessage('El email no es válido'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria'),
    handleInputErrors,
    loginUser)

export default router;