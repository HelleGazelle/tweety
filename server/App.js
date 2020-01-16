const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./dbConnection');
const userRouter = require('./routes/user');
const tweetRouter = require('./routes/tweets');

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

app.listen(3001, () => {
    console.log('Listening to port 3001');

    connectDB()
        .then(() => console.log('MongoDB Connected'))
        .catch(err => console.log("MongoDB Error"))
});