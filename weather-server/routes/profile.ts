import express from 'express'
import User from '../entity/userModel';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import passport from 'passport';

const profileRouter = express.Router()

profileRouter.get('/add-favourite', async (req, res) => {

})

profileRouter.post('/delete-favourite', async (req, res) => {
    const {username, password} = req.body


})

profileRouter.post('/clear-favourites', async (req, res) => {
    const {username, password} = req.body

})

profileRouter.get('/get-favourites', async (req, res) => {
    const {username, password} = req.body


})


export default profileRouter
