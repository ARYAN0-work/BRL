import express from "express";
import eventRoutes from "./routes/event.routes.js"
import authRoutes from "./routes/auth.routes.js"
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());

app.use("/api/v1/events",eventRoutes);
app.use("/api/v1/auth", authRoutes);

app.use(errorHandler);

export default app;