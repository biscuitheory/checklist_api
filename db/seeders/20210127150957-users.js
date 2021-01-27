const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const users = [
  {
    id: uuidv4(),
    firstname: 'Moon',
    lastname: 'Sailor',
    email: process.env.SEED_EMAIL,
    password: process.env.SEED_PWD,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', users, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};