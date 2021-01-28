const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const db = require('../models');

const { User } = db;

module.exports = {
  addUser: async (data) => {
    const { firstname, lastname, email, password } = data;

    const hashedPassword = await bcrypt.hash(password, 10);

    return User.create({
      id: uuidv4(),
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });
  },

  checkEmail: (userEmail) => {
    return User.findOne({
      attributes: ['email'],
      where: {
        email: userEmail,
      },
    });
  },
};
