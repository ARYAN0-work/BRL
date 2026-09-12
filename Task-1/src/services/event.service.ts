import {Event} from "../models/event.model.js";
import { IEvent } from "../models/event.model.js";

export const createEvent = async(eventData: IEvent)=>{
   const event = await Event.create(eventData);

   return event;
};

export const getAllEvents = async ()=>{
    const events = await Event.find();

    return events;
};

export const getEventById = async(eventId: string)=>{
    const event = await Event.findById(eventId);

    return event;
}

export const updateEvent = async(
    eventId : string,
    eventData: Partial<IEvent>
)=>{
    const event = await Event.findByIdAndUpdate(
        eventId,
        eventData,
        {
            new: true,
            runValidators: true,
        }
    )

    return event;
};

export const deleteEvent = async(eventId: string)=>{
    const event = await Event.findByIdAndDelete(eventId);

    return event;
} 


