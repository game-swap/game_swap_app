const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./config.js')

passport.use(
    new GoogleStrategy({
            clientID: keys.google.clientID,
            clientSecret: keys.google.clientSecret
    }, () => {

    })
)