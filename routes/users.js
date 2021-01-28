const express = require('express');
require('dotenv').config();

const usersController = require('../controllers/users');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { firstname, lastname, email } = req.body;

  const userFound = await usersController.checkEmail(email);
  if (userFound === null) {
    const newUser = await usersController.addUser(req.body);

    res.status(201).json({
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      email: newUser.email,
    });
  } else {
    return res.status(409).json({
      error: 'A user is already registered with this email address',
    });
  }
});

module.exports = router;
