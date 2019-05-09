const express = require('express');
const router = express.Router();
const controller = require('./controller');
const passport = require('passport')

router.route('/users')
.post(controller.addNewUser)

router.route('/games')
.get(controller.findGame)
.post(controller.addNewGame)

router.route('/google')
.get(
    passport.authenticate('google', {
    scope: ['profile']
})
)

router.route('/google/redirect')
.get()


module.exports = router;