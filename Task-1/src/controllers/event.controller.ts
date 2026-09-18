import {Request,Response} from "express";
import { EventStatus } from "../models/event.model.js";
import { createEvent, getAllEvents, getEventById,updateEvent, deleteEvent } from "../services/event.service.js";
import { registerForEvent } from "../services/registration.service.js";

export const createEventController = async(
    req: Request,
    res: Response
) => {
    const event = await createEvent(req.body);

    res.status(201).json({
        success: true,
        data: event,
    })
};

export const getAllEventsController = async (
    req: Request,
    res: Response
) => {
    const {
        search,
        venue,
        status,
        page = "1",
        limit = "10",
        sortBy = "startTime",
        order = "asc",
    } = req.query;

    const result = await getAllEvents(
        search as string,
        venue as string,
        status as EventStatus,
        Number(page),
        Number(limit),
        sortBy as string,
        order as string
    );

    res.status(200).json({
        success: true,
        data: result.events,
        pagination: result.pagination,
    });
};

export const getEventByIdController = async (
    req: Request,
    res: Response
) => {
    const event = await getEventById(req.params.id as string);

    if (!event) {
        return res.status(404).json({
            success: false,
            message: "Event not found",
        });
    }

    res.status(200).json({
        success: true,
        data: event,
    });
};


export const updateEventController = async(
    req:Request,
    res:Response
) =>{
    const event = await updateEvent(req.params.id as string, req.body);

    if (!event) {
    return res.status(404).json({
      success: false,
      message: "Event not found",
    });
  }

    res.status(200).json({
        success: true,
        data: event,
    })
}

export const deleteEventController = async (
    req: Request,
    res: Response
) => {
    const event = await deleteEvent(req.params.id as string);

    if (!event) {
        return res.status(404).json({
            success: false,
            message: "Event not found",
        });
    }

    res.status(200).json({
        success: true,
        data: event,
    });
};

export const registerForEventController = async (
    req: Request,
    res: Response
) => {
    const user = (req as any).user;

    const registration = await registerForEvent(
        user.userId,
        req.params.id as string
    );

    res.status(201).json({
        success: true,
        data: registration,
    });
};