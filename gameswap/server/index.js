const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const server = express();
const router = require('./router');
const passportSetup = require('../config/config-template.js')
const port = 3000;

server.use(morgan('dev'));
server.use(bodyParser.json()); 
server.use(bodyParser.urlencoded({ extended: true }));

server.use('/api', router);
server.use('/auth', router);

server.use(express.static(path.join(__dirname, '/../client/dist')));

server.listen(port, () => console.log(`✔ Connected at Port ${port}`));