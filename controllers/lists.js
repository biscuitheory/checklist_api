const { v4: uuidv4 } = require('uuid');
const db = require('../models');

const NotFoundError = require('../helpers/errors/validation_error');

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
  getListById: (id) => {
    console.log('spicegals', id);
    return List.findByPk(id);
  },
  updateList: async (data) => {
    const { id } = data;
    const listFound = await List.findByPk(id);
    if (!listFound) {
      return listFound;
    }

    return listFound.update(data);
  },
  deleteList: async (id) => {
    const listFound = await List.findByPk(id);
    if (!listFound) {
      throw new NotFoundError(
        'Not Found',
        'The requested ressource does not exist'
      );
    }
    return List.destroy({
      where: {
        id: id,
      },
    });
  },
};
