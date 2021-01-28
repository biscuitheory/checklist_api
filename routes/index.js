const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');

const router = express.Router();
const usersRouter = require('./users');
// const listsRouter = require('./lists');
// const tasksRouter = require('./tasks');
// const prioritiesRouter = require('./priorities');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(usersRouter);
// router.use(listsRouter);
// router.use(tasksRouter);
// router.use(prioritiesRouter);

router.get('/', (req, res) => {
  res.status(200).json({ message: '🚀 Checklist project 🚀' });
});

router.get('*', (req, res) => {
  res.status(404).json({
    error: "This resource doesn't exist :(",
  });
});

module.exports = router;
