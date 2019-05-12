const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.route('/users')
.post(controller.addNewUser)

router.route('/games')
.get(controller.findGame)
.post(controller.addNewGame)


module.exports = router;