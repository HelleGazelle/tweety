const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')
const userRouter = require('./routes/user');
const tweetRouter = require('./routes/tweets');

mongoose.connect('mongodb://127.0.0.1:27017/users', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
});

// define middleware
const app = express();
app.use(bodyParser.json());

//enable cors
app.use(cors());

app.use(userRouter);
app.use(tweetRouter);


// avoid getting favicon.ico
app.use( function(req, res, next) {
    if (req.originalUrl && req.originalUrl.split("/").pop() === 'favicon.ico') {
    return res.sendStatus(204);
    }
return next();
});

app.listen(3001, () => console.log('Listening to port 3001'));