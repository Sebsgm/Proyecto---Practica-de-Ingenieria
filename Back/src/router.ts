import { Router } from "express";
import { body } from "express-validator";
import { createUser, loginUser } from "./handlers";
import { handleInputErrors } from "./middleware/validation";
import { adminLogin } from "./handlers/adminAuth";
import { requireAdmin } from "./middleware/adminAuth";
import { requireUser } from "./middleware/userAuth";
import { getCoursesPublic } from "./handlers/coursesPublic";
import * as adminCourses from "./handlers/adminCourses";
import { handleCourseFileUpload } from "./middleware/uploadError";

const router = Router();

// ─── AUTH ───────────────────────────────────────────────────────────────────
router.post(
    "/auth/register",
    body("name").notEmpty().withMessage("El nombre es obligatorio"),
    body("email").isEmail().withMessage("El email no es válido"),
    body("password")
        .isLength({ min: 8 })
        .withMessage("La contraseña debe tener al menos 8 caracteres"),
    handleInputErrors,
    createUser
);

router.post(
    "/auth/login",
    body("email").isEmail().withMessage("El email no es válido"),
    body("password").notEmpty().withMessage("La contraseña es obligatoria"),
    handleInputErrors,
    loginUser
);

// ─── CURSOS: ruta pública (listado sin detalles) ─────────────────────────────
router.get("/api/courses", getCoursesPublic);

// ─── CURSOS: ruta protegida — requiere JWT de usuario logueado ───────────────
router.get("/api/courses/private", requireUser, getCoursesPublic);

// ─── ADMIN AUTH ──────────────────────────────────────────────────────────────
router.post(
    "/admin/auth/login",
    body("email").isEmail().withMessage("El email no es válido"),
    body("password").notEmpty().withMessage("La contraseña es obligatoria"),
    handleInputErrors,
    adminLogin
);

// ─── ADMIN PANEL ─────────────────────────────────────────────────────────────
const adminRouter = Router();
adminRouter.use(requireAdmin);
adminRouter.get("/courses", adminCourses.adminListCourses);
adminRouter.post(
    "/courses",
    body("title").notEmpty().withMessage("El título es obligatorio"),
    handleInputErrors,
    adminCourses.adminCreateCourse
);
adminRouter.put("/courses/:id", adminCourses.adminUpdateCourse);
adminRouter.delete("/courses/:id", adminCourses.adminDeleteCourse);
adminRouter.post(
    "/courses/:id/videos",
    body("url").notEmpty().withMessage("La URL del video es obligatoria"),
    handleInputErrors,
    adminCourses.adminAddVideo
);
adminRouter.delete("/courses/:id/videos/:videoId", adminCourses.adminDeleteVideo);
adminRouter.post("/courses/:id/files", handleCourseFileUpload, adminCourses.adminAddFile);
adminRouter.delete("/courses/:id/files/:fileId", adminCourses.adminDeleteFile);

router.use("/admin", adminRouter);

export default router;
