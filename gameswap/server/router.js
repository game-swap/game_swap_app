const express = require('express');
const router = express.Router();
const controller = require('./controller');
const passport = require('passport')

router.route('/users')
.post(controller.addNewUser)

router.route('/users/:user_id')
.get(controller.findUserByUserId)
.delete(controller.deleteUser)

router.route('/users/:user_id/offers')
.get(controller.findAllOffersByUserId)
// .delete(controller.deleteAllOffersByUserId)

router.route('/offers')
.get(controller.findAllOffersSortedByNew)

router.route('/offers/:offer_id')
.get(controller.findOfferByOfferId)
.delete(controller.deleteOfferByOfferId)

router.route('/games') // games/?sort=offers
.get(controller.findAllGames) 
.post(controller.postNewOffer)

router.route('/games/:game_id')
.get(controller.findGame)


router.route('/google')
.get(
    passport.authenticate('google', {
    scope: ['profile']
})
)

router.route('/google/redirect')
.get()


module.exports = router;