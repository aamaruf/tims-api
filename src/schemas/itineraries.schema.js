import mongoose from "mongoose";

const itinerariesSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        destinations: {
            type: [String],
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        activities: {
            type: [String],
            required: true,
        },
        transportations: {
            type: [String],
            required: true,
        },
        accommodations: {
            type: [String],
            required: true,
        },
        members: {
            type: Number,
            required: true,
        },
        note: String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        archived: {
            type: Boolean,
            default: false,
        }
    },
    { timestamps: true }
);

export const ItinerariesModel = mongoose.model("Itineraries", itinerariesSchema);