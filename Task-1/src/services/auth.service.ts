import bcrypt from "bcryptjs";
import jwt,{SignOptions} from "jsonwebtoken";
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

export const loginUser = async (
    email: string,
    password: string
) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordValid) {
        throw new Error("Invalid email or password");
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error("JWT secret is not configured");
    }
    
    const signOptions: SignOptions = {
      expiresIn: (process.env.JWT_EXPIRES_IN || "1d") as SignOptions['expiresIn'],
    };
    
    const token = jwt.sign(
      {
        userId: user._id.toString(),
      },
      jwtSecret,
      signOptions
);

    return {
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
    };
};