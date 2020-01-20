const express = require('express')
const Twitter = require('twitter');
const router = express.Router();
var jwt = require('express-jwt');
require('dotenv').config();

// create twitter api client with environment credentials
const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

// twitter timeline api endpoint
const userTimelineUrl = 'statuses/user_timeline.json?screen_name=';

// build up the api request
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