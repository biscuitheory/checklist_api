const { v4: uuidv4 } = require('uuid');
const db = require('../models');

const { List } = db;

module.exports = {
  addList: (data) => {
    const { name, user_id } = data;

    return List.create({
      user_id,
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
    return List.findByPk(id);
  },
  updateList: async (data, id) => {
    const listFound = await List.findByPk(id);
    if (!listFound) {
      return listFound;
    }

    return listFound.update(data);
  },
  deleteList: async (id) => {
    // const listFound = await List.findByPk(id);
    // if (!listFound) {
    //   throw new NotFoundError(
    //     'Not Found',
    //     'The requested ressource does not exist'
    //   );
    // }
    return List.destroy({
      where: {
        id: id,
      },
    });
  },
};
