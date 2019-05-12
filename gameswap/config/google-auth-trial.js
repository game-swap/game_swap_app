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



//router configs
router.get('google/logout', function(req, res) {
  req.logout()
  res.redirect('/')
})
router.get('/google', passport.authenticate('google', (err, user, info) => {
  if (err) { return next(err) }
}), async (req, res, next) => {
  // The request will be redirected to google for authentication, so this
  // function will not be called.
  console.log('google',req)
  res.redirect('/')
  next()
})
router.get('/google/callback', passport.authenticate('google', {
    successRedirect: '/google/redirect',
    failureRedirect: '/google'
  }), async (req, res, next) => {
      // console.log(req.user.dataValues)
      res.send(req.user.dataValues)
})
// Redirect the user back to the app
router.get('/google/redirect', async (req, res, next) => {
// you can see what you get back from google here:
console.log(req.user.dataValues) 
//   res.redirect(<deep-link-to-react-native-app>)
})
