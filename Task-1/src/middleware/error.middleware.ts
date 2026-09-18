import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(err);

    if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: Object.values(err.errors).map((error) => error.message),
        });
    }

    if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({
        success: false,
        message: "Invalid event ID",
    });
}

        if (
        err.message.includes("already exists") ||
        err.message.includes("already registered")
    ) {
        return res.status(409).json({
            success: false,
            message: err.message,
        });
    }

    if (
        err.message.includes("must be in the future") ||
        err.message.includes("must be after start time") ||
        err.message.includes("cannot be updated") ||
        err.message.includes("cannot be deleted")
    ) {
        return res.status(400).json({
            success: false,
            message: err.message,
        });
    }

    return res.status(500).json({
        success: false,
        message: "Internal server error",
    });
};