import express from "express";
import eventRoutes from "./routes/event.routes.js"
import { errorMiddleware } from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());

app.use("/api/v1/events",eventRoutes);

app.use(errorMiddleware);

export default app;