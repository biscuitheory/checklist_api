const { v4: uuidv4 } = require('uuid');
const db = require('../models');

const { List } = db;

module.exports = {
  addList: (data) => {
    const { name } = data;

    return List.create({
      id: uuidv4(),
      name,
    });
  },
  getLists: () => {
    return List.findAll({
      attributes: ['id', 'name'],
    });
  },
  updateList: async (data) => {
    const { id } = data;
    const listFound = await List.findByPk(id);
    if (!listFound) {
      return listFound;
    }

    console.log('wehs', listFound);
    return listFound.update(data);
  },
};
