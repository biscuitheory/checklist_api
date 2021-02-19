const db = require('../models');

const { Priority } = db;

module.exports = {
  getPriorityById: (id) => {
    return Priority.findByPk(id, { attributes: ['name'] });
  },
};
