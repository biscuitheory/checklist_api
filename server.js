const express = require('express');
require('dotenv').config();
const morgan = require('morgan');

const server = express();

const { errorHandler, errorLogger } = require('./middlewares');

const NotFoundError = require('./helpers/errors/not_found_error');

const router = require('./routes');

router.use(morgan('dev'));

server.use('/api', router);
server.use('*', (req, res, next) => {
  throw new NotFoundError('Not Found', 'Cannot find the requested resource');
});

server.use(errorHandler);
server.use(errorLogger);

module.exports = server;
