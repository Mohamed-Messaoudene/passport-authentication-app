
const  session = require('express-session');
const  MongoStore = require('connect-mongo');

const secret_key = process.env.SESSION_SECRET_KEY || 'your_default_secret_key';
const db_connection_uri = process.env.DB_CONNECTION_URL || 'your_default_mongo_url'; 

const sessionMiddleware = session({
    secret: secret_key,
    resave: false, // Avoid resaving session if nothing is changed
    saveUninitialized: false, // Don't save uninitialized sessions
    store: MongoStore.create({
      mongoUrl: db_connection_uri, // MongoDB connection string
      collectionName: 'sessions', // Collection to store session data
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day, adjust as needed
    },
});
module.exports = sessionMiddleware;
