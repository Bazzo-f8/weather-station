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
    const { username, city } = req.body; // Assuming user and city are sent in the request body
    console.log(username, city);
    try {
        await db.addFavourite(username, city);
        res.status(200).json({ message: 'Favourite added successfully' });
    } catch (error) {
        console.error('Error adding favourite:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// api per cancellare un preferito
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


// api per cancellare tutti i preferiti
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

// api per prendere i preferiti se si aggiunge weather(true) tra i parametri si prenderà anche il meteo salvato dei preferiti(per il grafico)
profileRouter.get('/get-favourites', async (req, res) => {
    const username = req.query.username + "";
    const weather = req.query.weather + "";

    try {
        const favourites = await db.getFavourites(username, weather);

        res.status(200).json({ favourites });
    } catch (error) {
        console.error('Error getting favourites:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

})


export default profileRouter
