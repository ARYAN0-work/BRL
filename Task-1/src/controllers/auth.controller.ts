import { Request, Response } from "express";
import { registerUser } from "../services/auth.service.js";
import { loginUser } from "../services/auth.service.js";

export const registerController = async (
    req: Request,
    res: Response
) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Name, email and password are required",
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            success: false,
            message: "Password must be at least 6 characters",
        });
    }

    const user = await registerUser(name, email, password);

    return res.status(201).json({
        success: true,
        data: user,
    });
};

export const loginController = async (
    req: Request,
    res: Response
) => {
    const { email, password } = req.body;

    const result = await loginUser(email, password);

    res.status(200).json({
        success: true,
        data: result,
    });
};

export const getMeController = async (
    req: Request,
    res: Response
) => {
    res.status(200).json({
        success: true,
        data: (req as any).user,
    });
};

export const logoutController = async (
    req: Request,
    res: Response
) => {
    res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
};