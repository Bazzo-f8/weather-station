import express from 'express'
import User from '../entity/userModel';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import passport from 'passport';
import {Database} from "../src/database";
import {City} from "../types/city";

const db = new Database();

const profileRouter = express.Router()


// rotta per aggiungere un preferito (/profile/add-favourite) ha bisogno del nome utente e di un oggetto City
profileRouter.post('/add-favourite', async (req, res) => {
    //const city : City = JSON.parse(req.body.city+"");
    const { user, city } = req.body; // Assuming user and city are sent in the request body

    try {
        await db.addFavourite(user, city);
        res.status(200).json({ message: 'Favourite added successfully' });
    } catch (error) {
        console.error('Error adding favourite:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


profileRouter.post('/delete-favourite', async (req, res) => {
    const { username, city } = req.body;

    try {
        await db.removeFavourite(username, city);

        res.status(200).json({ message: 'Favourite deleted successfully' });
    } catch (error) {
        console.error('Error deleting favourite:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

profileRouter.post('/clear-favourites', async (req, res) => {
    const { username } = req.body;

    try {
        await db.clearFavourites(username);

        res.status(200).json({ message: 'Favourites cleared successfully' });
    } catch (error) {
        console.error('Error clearing favourites:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

profileRouter.get('/get-favourites', async (req, res) => {
    const { username } = req.body;

    try {
        const favourites = await db.getFavourites(username);

        res.status(200).json({ favourites });
    } catch (error) {
        console.error('Error getting favourites:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

})


export default profileRouter
