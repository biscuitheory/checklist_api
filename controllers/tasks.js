const { v4: uuidv4 } = require('uuid');
const db = require('../models');

const { Task } = db;

module.exports = {
  addTask: (data) => {
    const { name, description, priority_id, list_id } = data;

    return Task.create({
      id: uuidv4(),
      name,
      description,
      priority_id,
      list_id,
    });
  },
  getTasks: () => {
    return Task.findAll({
      attributes: ['id', 'name', 'description', 'priority_id', 'list_id'],
    });
  },
  getTaskById: (id) => {
    return Task.findByPk(id);
  },
  getTasksByListId: (list_id) => {
    console.log('banana', list_id);
    return Task.findAll({
      where: {
        list_id: list_id,
      },
    });
  },
  updateTask: async (data) => {
    const { id } = data;
    const taskFound = await Task.findByPk(id);
    if (!taskFound) {
      return taskFound;
    }
    return taskFound.update(data);
  },
  deleteTask: async (id) => {
    return Task.destroy({
      where: {
        id: id,
      },
    });
  },
};
