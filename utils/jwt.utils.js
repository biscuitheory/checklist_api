const jwt = require('jsonwebtoken');
require('dotenv').config;

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
};
