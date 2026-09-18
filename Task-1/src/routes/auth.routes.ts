import { Router } from "express";
import {
    registerController,
    loginController,
    getMeController,
    logoutController
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/me", authMiddleware, getMeController);
router.post("/logout", authMiddleware, logoutController);

export default router;