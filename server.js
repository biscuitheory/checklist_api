const express = require('express');
require('dotenv').config();
const morgan = require('morgan');

const server = express();

const router = express.Router();

server.use('/api', router);

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Starting that checklist business' });
});
module.exports = server;
