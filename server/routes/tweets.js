const express = require('express')
const Twitter = require('twitter');
const router = express.Router();
const config = require('../config.js');
var jwt = require('express-jwt');
require('dotenv').config();

const client = new Twitter(config);
const userTimelineUrl = 'statuses/user_timeline.json?screen_name=';

const tweetsFromAccount = (accountName) => client.get(userTimelineUrl + accountName + '&count=200', {});

// return tweets as json for the given screen name
router.get('/tweets/:accountName', jwt({secret: process.env.JWT_KEY}), async (req, res) => {
    try {
        const data = await tweetsFromAccount(req.params.accountName);
        res.json(data);
    } catch(e) {
        res.send('Tweets could not be loaded: ' + e);
    }
        
})

module.exports = router;