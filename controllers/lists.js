const { v4: uuidv4 } = require('uuid');
const db = require('../models');

const { List, Task } = db;

module.exports = {
  addList: (data) => {
    const { name, user_id } = data;
    // const { name, user_id, rank } = data;

    return List.create({
      user_id,
      id: uuidv4(),
      name,
      // rank,
    });
  },
  getLists: (user_id) => {
    return List.findAll({
      // attributes: ['id', 'name', 'user_id'],
      where: {
        user_id: user_id,
      },
    });
  },
  getListById: (id) => {
    return List.findByPk(id);
  },
  // getListsTasks: () => {
  //   return List.findAll({
  //     include: [
  //       {
  //         model: Task,
  //         attributes: ['id', 'name', 'description', 'list_id', 'priority_id'],
  //       },
  //     ],
  //   });
  // },
  getListsTasks: (user_id) => {
    return List.findAll({
      where: {
        user_id: user_id,
      },
      include: [
        {
          model: Task,
          attributes: [
            'id',
            'name',
            'description',
            'list_id',
            'priority_id',
            // 'rank',
          ],
        },
      ],
    });
  },
  updateList: async (data) => {
    console.log('atata', data);
    const { list_id } = data;

    const listFound = await List.findByPk(list_id);
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
