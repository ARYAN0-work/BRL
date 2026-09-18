import { Schema, model, Types } from "mongoose";

export interface IRegistration {
    userId: Types.ObjectId;
    eventId: Types.ObjectId;
}

const registrationSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        eventId: {
            type: Schema.Types.ObjectId,
            ref: "Event",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

registrationSchema.index(
    { userId: 1, eventId: 1 },
    { unique: true }
);

export const Registration = model<IRegistration>(
    "Registration",
    registrationSchema
);