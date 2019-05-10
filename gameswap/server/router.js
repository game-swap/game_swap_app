const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.route('/users')
.post(controller.addNewUser)

router.route('/users/:user_id')
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



module.exports = router;