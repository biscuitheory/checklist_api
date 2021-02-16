const jwt = require('jsonwebtoken');
require('dotenv').config;

const ForbiddenError = require('../helpers/errors/forbidden_error');
const UnauthorizedError = require('../helpers/errors/unauthorized_error');

const SECRET = process.env.WT_SIGN_SECRET;

module.exports = {
  genToken: (userData) => {
    return jwt.sign(
      {
        userId: userData.id,
        userAdmin: userData.admin,
      },
      SECRET
    );
  },

  authenticateJWT: (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, SECRET, (err, user) => {
        if (err) {
          console.log(err);
          throw new ForbiddenError('Forbidden', 'The access is not allowed');
        }

        req.user = user;

        next();
      });
    } else {
      throw new UnauthorizedError(
        'Unauthorized',
        'You must be connected to have access to this resource'
      );
    }
  },
};
