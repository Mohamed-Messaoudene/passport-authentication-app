const express = require("express");
const passport = require("passport");
const connectToMongodb = require("./config/db-connection");
const authRoutes = require("./routes/auth-routes");
const cors = require("cors");
const path = require("path");
const sessionMiddleware = require("./middlwares/sessionMiddleware");
const app = express();
require("./config/passport-local-setup");
require("./config/passport-google-oauth-setup");
require("./config/passport-facebook-oauth-setup");
require("./config/passport-github-oauth-setup");

app.use(express.json());
const corsOptions = {
  origin: process.env.CLIENT_URL, // Replace with your frontend's URL
  credentials: true, // This allows cookies to be sent with the request
  allowedHeaders: "Content-Type, Authorization", // Add headers you need
};
app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; font-src 'self' https://fonts.gstatic.com; style-src 'self' https://fonts.googleapis.com;");
  next();
});
app.use(express.static(path.join(__dirname, "../client/build")));
// connect to the data base
connectToMongodb();
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", authRoutes);


app.listen(5000, async () => {
  console.log("the server is running on port 5000 !!");
});