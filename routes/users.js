const express = require('express');

const usersController = require('../controllers/users');
const { CREATED } = require('../helpers/status_codes');
const BadRequestError = require('../helpers/errors/bad_request_error'),
  ConflictError = require('../helpers/errors/conflict_error'),
  ValidationError = require('../helpers/errors/validation_error');
const { userValidation } = require('../validators');

const router = express.Router();

router.post('/signup', async (req, res, next) => {
  const { email } = req.body;

  const errors = userValidation(req.body);
  if (errors) throw new ValidationError(errors);

  const userFound = await usersController.checkEmail(email);
  if (userFound === null) {
    const newUser = await usersController.addUser(req.body);

    res.status(CREATED).json({
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      email: newUser.email,
    });
  } else {
    throw new ConflictError(
      'Conflict',
      'An user is already registered with this email address'
    );
  }
});

module.exports = router;
