const express = require('express');
require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const whitelist = [
  process.env.REACT_APP_PROD_URL,
  process.env.REACT_APP_DEV_URL,
];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) != -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

const server = express();

const { errorHandler, errorLogger } = require('./middlewares');

const NotFoundError = require('./helpers/errors/not_found_error');

const router = require('./routes');

router.use(morgan('dev'));

server.use(helmet());
server.use('/api', cors(corsOptions), router);
server.use('*', (req, res, next) => {
  throw new NotFoundError('Not Found', 'Cannot find the requested resource');
});

server.use(errorHandler);
server.use(errorLogger);

module.exports = server;
