const express = require('express');
const cors = require('cors');
const config = require('./config.js');
const Twitter = require('twitter');

// define middleware
const app = express();

//enable cors
app.use(cors());

const client = new Twitter(config);
const userTimelineUrl = 'statuses/user_timeline.json?screen_name=';

const tweetsFromAccount = (accountName) => client.get(userTimelineUrl + accountName + '&count=200', {});

// return tweets as json for the given screen name
app.use('/tweets/:accountName', async (req, res) => {
    try {
        const data = await tweetsFromAccount(req.params.accountName);
        res.json(data);
    } catch(e) {
        res.send('Tweets could not be loaded: ' + e);
    }
        
})

// avoid getting favicon.ico
app.use( function(req, res, next) {
    if (req.originalUrl && req.originalUrl.split("/").pop() === 'favicon.ico') {
    return res.sendStatus(204);
    }
return next();
});

app.listen(3001, () => console.log('Listening to port 3001'));