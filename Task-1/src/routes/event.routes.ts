import { Router } from "express";

import { createEventController, getAllEventsController, getEventByIdController, updateEventController, deleteEventController} from "../controllers/event.controller.js";

const router = Router();

router.post("/",createEventController);
router.get("/",getAllEventsController);
router.get("/:id",getEventByIdController);
router.put("/:id",updateEventController);
router.delete("/:id",deleteEventController);

export default router;