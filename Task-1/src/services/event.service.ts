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

export const updateEvent = async (
    eventId: string,
    eventData: Partial<IEvent>
) => {

    console.log("ID received by service:", eventId);
    console.log("Data received by service:", eventData);

    const event = await Event.findByIdAndUpdate(
        eventId,
        eventData,
        {
            new: true,
            runValidators: true,
        }
    );

    console.log("Updated event:", event);

    return event;
};

export const deleteEvent = async(eventId: string)=>{
    const event = await Event.findByIdAndDelete(eventId);

    return event;
} 


