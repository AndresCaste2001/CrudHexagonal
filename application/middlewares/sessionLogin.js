const session = require('express-session');
const sessionAuth = require('express').Router();

module.exports = sessionAuth.use(session({
    secret: process.env.KEY_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true,
        maxAge: parseInt(proess.env.EXPRESS_EXPIRE)
    }
}))