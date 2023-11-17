import mongoose from "mongoose";

const usersSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        address: String,
        isVerified: {
            type: Boolean,
            default: false,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        isBlocked: {
            type: Boolean,
            default: false,
        },
        itineraries: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Itineraries",
            }
        ],
        token: {
            type: String,
            default: null,
        },
    },
    { timestamps: true }
);




export const UserModel = mongoose.model("User", usersSchema);