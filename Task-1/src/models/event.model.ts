import { Schema, model } from "mongoose";

export enum EventStatus {
    UPCOMING = "UPCOMING",
    ONGOING = "ONGOING", 
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED",
}

const eventSchema = new Schema(
    {
        name:{
            type: String,
            required: true,
            trim: true
        },

        description:{
            type: String,
            required:true,
            trim: true
        },

        startTime: {
            type: Date,
            required: true,
        },

        endTime:{
            type: Date,
            required: true,
        },

        venue: {
            type: Date,
            required: true,
            trim: true,
        },

        capacity:{
            type: Number,
            required: true,
        },

        status:{
            type: String,
            enum: Object.values(EventStatus),
            default: EventStatus.UPCOMING
        },
    },
    {
        timestamps:true,
    }
)

export const Event = model("Event",eventSchema);