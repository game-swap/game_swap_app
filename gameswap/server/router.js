const express = require('express');
const router = express.Router();
const controller = require('./controller');
const passport = require('passport')

router.route('/users')
.post(controller.addNewUser)

router.route('/games')
.get(controller.findGame)
.post(controller.addNewGame)

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


module.exports = router;