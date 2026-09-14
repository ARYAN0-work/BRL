import {Request,Response} from "express";

import { createEvent, getAllEvents, getEventById,updateEvent, deleteEvent } from "../services/event.service.js";

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

export const getAllEventsController = async(
    req: Request,
    res: Response
) => {
    const events = await getAllEvents();

    res.status(200).json({
        success:true,
        data: events
    })
}

export const getEventByIdController = async (
  req: Request,
  res: Response
) => {
  const event = await getEventById(req.params.id as string);

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

export const deleteEventContoller = async(
    req: Request,
    res: Response
)=> {
    const event = await deleteEvent(req.params.id as string);

    res.status(200).json({
        success: true,
        data: event,
    })
}