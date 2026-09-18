import { Request, Response } from "express";
import { registerUser } from "../services/auth.service.js";

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