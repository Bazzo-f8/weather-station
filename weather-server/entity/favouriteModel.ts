import mongoose from "mongoose";

const FavouriteSchema = new mongoose.Schema({
    user_id: String,
    favourite: Array<string>,
});

export const FavouriteModel = mongoose.model('Favourites', FavouriteSchema);
