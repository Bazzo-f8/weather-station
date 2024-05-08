import mongoose from "mongoose";
import { Schema, Types } from "mongoose"; // Import Types for ObjectId

const FavouriteSchema = new mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId, // Use ObjectId for user reference
        required: true,
        ref: "User", // Reference the User model (assuming it exists)
    },
    favourite: {
        type: [Schema.Types.ObjectId],
        default: [], // Set default value to an empty array
    },
});

export const FavouriteModel = mongoose.model("Favourites", FavouriteSchema);
