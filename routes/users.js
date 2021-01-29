const express = require('express');

const usersController = require('../controllers/users');
const { genToken } = require('../utils/jwt.utils');

const { CREATED, OK } = require('../helpers/status_codes');
const BadRequestError = require('../helpers/errors/bad_request_error'),
  ConflictError = require('../helpers/errors/conflict_error'),
  UnauthorizedError = require('../helpers/errors/unauthorized_error');
ValidationError = require('../helpers/errors/validation_error');
const { signUpValidation, signInValidation } = require('../validators');
const jwtUtils = require('../utils/jwt.utils');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email } = req.body;

  const errors = signUpValidation(req.body);
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

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  const errors = signInValidation(req.body);
  if (errors) throw new ValidationError(errors);

  const userFound = await usersController.getUserByEmail(email);

  if (userFound) {
    const isIdentified = await usersController.checkPassword(
      password,
      userFound.password
    );

    if (isIdentified) {
      res.status(OK).json({
        token: jwtUtils.genToken(userFound),
        user: {
          id: userFound.id,
          firstname: userFound.firstname,
          lastname: userFound.lastname,
        },
      });
    } else {
      throw new UnauthorizedError(
        'Unauthorized',
        "Email & Password doesn't match"
      );
    }
  } else {
    throw new UnauthorizedError(
      'Unauthorized',
      'No account is referenced on ToDoList under this email address'
    );
  }
});

module.exports = router;
