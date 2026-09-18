import { Router } from "express";
import {
    createEventController,
    getAllEventsController,
    getEventByIdController,
    updateEventController,
    deleteEventController,
} from "../controllers/event.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", getAllEventsController);
router.get("/:id", getEventByIdController);

router.post("/", authMiddleware, createEventController);
router.put("/:id", authMiddleware, updateEventController);
router.delete("/:id", authMiddleware, deleteEventController);

export default router;