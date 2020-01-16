const mongoose = require("mongoose");

const connection = "mongodb://localhost:27017/User";

const connectDb = () => {
  return mongoose.connect(connection, { useNewUrlParser: true });
};

module.exports = connectDb;