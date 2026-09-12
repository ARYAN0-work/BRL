import { Schema, model } from "mongoose";

export enum EventStatus {
    UPCOMING = "UPCOMING",
    ONGOING = "ONGOING", 
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED",
}

export interface IEvent {
    name: string;
    decription: string;
    startTime: Date;
    endTime: Date;
    venue: string;
    capacity: number;
    status: EventStatus;
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

export const Event = model<IEvent>("Event",eventSchema);