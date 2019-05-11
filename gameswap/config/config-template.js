const passport = require('passport');
const keys = require('./keys.js')
const GoogleStrategy = require('passport-google-oauth20').Strategy

const googleConfig = {
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: 'http://localhost:3000/auth/google/redirect',
    scope: ['r_emailaddress', 'r_basicprofile'],
    state: true
  }
  const strategy = new GoogleStrategy(
    googleConfig,
    (accessToken, refreshToken, profile, done) => {
      const googleId = profile._json.id
      const nameFirst = profile._json.firstName
      const nameLast = profile._json.lastName
      const email = profile._json.emailAddress
      const googleToken = accessToken // we need to store this
       try {
        User.findOrCreate({
          where: {googleId},
          defaults: {
            nameFirst,
            nameLast,
            email,
            googleToken,
 
          }
        })
      } catch (err) {
        done(err)
      }
    }
  )
// Tell passport to use the above strategy
passport.use(strategy)