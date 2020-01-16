const mongoose = require("mongoose");

const connection = "mongodb://mongo:27017";

const connectDb = () => {
   mongoose.connect(connection);
   mongoose.connection.on('connected', () => console.log('Connected'));
   mongoose.connection.on('error', () => console.log('Connection failed with - ',err));
};

module.exports = connectDb;