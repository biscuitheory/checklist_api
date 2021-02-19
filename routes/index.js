const express = require('express');
require('express-async-errors');
const bodyParser = require('body-parser');

const router = express.Router();
const usersRouter = require('./users');
const listsRouter = require('./lists');
const tasksRouter = require('./tasks');
// const prioritiesRouter = require('./priorities');

const { OK } = require('../helpers/status_codes');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(usersRouter);
router.use(listsRouter);
router.use(tasksRouter);
// router.use(prioritiesRouter);

router.get('/', (req, res) => {
  res.status(OK).json({ message: '🚀 Checklist project 🚀' });
});

module.exports = router;
