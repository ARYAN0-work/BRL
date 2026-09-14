import {Event,IEvent,EventStatus} from "../models/event.model.js";

const getEventStatus = (startTime: Date, endTime: Date): EventStatus => {
    const now = new Date();

    if (now < startTime) return EventStatus.UPCOMING;
    if (now < endTime) return EventStatus.ONGOING;

    return EventStatus.COMPLETED;
};

export const createEvent = async (eventData: IEvent) => {
    if (new Date(eventData.startTime) <= new Date()) {
        throw new Error("Event start time must be in the future");
    }

    if (new Date(eventData.endTime) <= new Date(eventData.startTime)) {
        throw new Error("Event end time must be after start time");
    }

    eventData.status = getEventStatus(
    new Date(eventData.startTime),
    new Date(eventData.endTime)
    );

    const duplicate = await Event.findOne({
    name: eventData.name,
    venue: eventData.venue,
    startTime: eventData.startTime,
    });

    if (duplicate) {
        throw new Error("An event with the same name, venue and start time already exists");
    }
    
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
    const existingEvent = await Event.findById(eventId);

    if (!existingEvent) {
        return null;
    }

    if (
        existingEvent.status === EventStatus.ONGOING ||
        existingEvent.status === EventStatus.COMPLETED
    ) {
        throw new Error("Started or completed events cannot be updated");
    }

    const event = await Event.findByIdAndUpdate(
        eventId,
        eventData,
        {
            new: true,
            runValidators: true,
        }
    );

    return event;
};

export const deleteEvent = async(eventId: string)=>{
    const event = await Event.findByIdAndDelete(eventId);

    return event;
} 


