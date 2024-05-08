import express from 'express'
import User from '../entity/userModel';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {Database} from "../src/database";

const db = new Database();



const authRouter = express.Router()

authRouter.post('/register', async (req, res) => {
    const {username, password} = req.body
    console.log("va tutto tranquillo")
    try {
        console.log(username, password)
        const existingUsername = await User.findOne({username})
        console.log(existingUsername)
        if (existingUsername) {
            return res.status(400).json({message: "L'username è già in uso"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({username, password: hashedPassword})
        await newUser.save()
        db.addUserToFavourite(username)

        //res.status(201).json({message: "Utente registrato con successo!", user: newUser.username})
        //@ts-ignore
        res.status(201).json({user: newUser.username})
        console.log("successo")
    } catch (error) {
        console.error("Errore nella registrazione", error)
        res.status(402).json({message: "Errore nella registrazione"})
    }
})

authRouter.post('/login', async (req, res) => {
    const {username, password} = req.body

    try {
        const user = await User.findOne({username})

        if (!user) {
            return res.status(401).json({message: "Utente non trovato"})
        }

        //@ts-ignore
        const passwordisValid = await bcrypt.compare(password, user.password)

        if (!passwordisValid) {
            return res.status(401).json({message: "Password non valida"})
        }

        //creazione token
        const token = jwt.sign({username: username}, "mysecret", {expiresIn: '1h'})

        res.status(200).json({
            message: "Login avvenuto con successo!",
            token: token,
        })
    } catch (error) {
        console.error("errore durante il login", error)
        res.status(500).json({message: "Errore durante il login"})
    }
})


export default authRouter
