import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";

export const registerUser = async (
    name: string,
    email: string,
    password: string
) => {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    return {
        id: user._id,
        name: user.name,
        email: user.email
    };
};