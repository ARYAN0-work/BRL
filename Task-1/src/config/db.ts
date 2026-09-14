import  "dotenv/config";
import mongoose from "mongoose";

const connectDb = async () : Promise<void> =>{
    try {
        const mongoURI = process.env.MONGODB_URI;

        if (!mongoURI) {
            throw new Error("MONGODB_URI is not connected");
        }

        await mongoose.connect(mongoURI)

        console.log("MongoDB connected");
        
    } catch (error) {
        console.log("MongoDB Connection Failed:",error);
        process.exit(1);
    }
}

export default connectDb;