const express = require('express')
const mongoose = require('mongoose');
const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const saltRounds = 10;

const router = express.Router()

router.post('/users/register', async (req, res) => {
    // Create a new user
    try {
        let user = new User(req.body);
        user.password = bcrypt.hashSync(user.password, saltRounds);
        await user.save();
        return res.status(201).send({ email: user.email })
    } catch (error) {
        return res.status(400).send(error)
    }
})

router.post('/users/login', async(req, res) => {
    //Login a registered user
    try {
        const { email, password } = req.body;
        // Search for a user by email and password.
        const user = await User.findOne({ email} )
        if (!user) {
            throw new Error({ error: 'Invalid login credentials' })
        }
        if (!await bcrypt.compare(password, user.password)) {
            throw new Error({ error: 'Invalid login credentials' });
        }

        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        };
        const token = generateAuthToken(user);
        console.log('sucessfully logged in: ' + user.email);
        return res.send(token);
    } catch (error) {
        return res.status(401).send(error);
    }

})

const generateAuthToken = (user) => {
    // Generate an auth token for the user
    return jwt.sign({_id: user._id}, process.env.JWT_KEY);
}

module.exports = router