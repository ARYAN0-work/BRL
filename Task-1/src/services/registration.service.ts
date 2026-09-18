import { Event, EventStatus } from "../models/event.model.js";
import { Registration } from "../models/registration.model.js";
import mongoose from "mongoose";

export const registerForEvent = async (
    userId: string,
    eventId: string
) => {
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        throw new Error("Invalid event ID");
    }

    const event = await Event.findById(eventId);

    if (!event) {
        throw new Error("Event not found");
    }

    if (
        event.status === EventStatus.COMPLETED ||
        event.status === EventStatus.CANCELLED
    ) {
        throw new Error("Registration is not available for this event");
    }

    const existingRegistration = await Registration.findOne({
        userId,
        eventId,
    });

    if (existingRegistration) {
        throw new Error("User is already registered for this event");
    }

    const registrationCount = await Registration.countDocuments({
        eventId,
    });

    if (registrationCount >= event.capacity) {
        throw new Error("Event capacity is full");
    }

    const registration = await Registration.create({
        userId,
        eventId,
    });

    return registration;
};