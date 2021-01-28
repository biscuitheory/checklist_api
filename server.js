const express = require('express');
require('dotenv').config();
const morgan = require('morgan');

const server = express();

const router = require('./routes');

server.use('/api', router);

router.use(morgan('dev'));

module.exports = server;
