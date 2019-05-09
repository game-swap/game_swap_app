const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.route('/users')
.post(controller.addNewUser)
.delete(controller.deleteUser)

router.route('/games')
.post(controller.postNewOffer)
.get(controller.findGame)

router.route('/offers')
.get(controller.findAllOffersSortedByNew)

router.route('/offers/:offer_id')
.get(controller.findOfferByOfferId)
.delete(controller.deleteOfferByOfferId)

router.route('/users/:user_id/offers')
.get(controller.findAllOffersByUserId)
.delete(controller.deleteAllOffersByUserId)


module.exports = router;