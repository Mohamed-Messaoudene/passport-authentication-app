const mongoose = require("mongoose");
require("dotenv").config();

function connectDB() {
  // Connect to MongoDB using Mongoose
  mongoose
    .connect(process.env.DB_CONNECTION_URI,{
      serverSelectionTimeoutMS: 5000 // Timeout in milliseconds
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Connection to database failed!", err);
      process.exit(1);
    });
}
//?retryWrites=true&w=majority&appName=Cluster0
module.exports = connectDB;
