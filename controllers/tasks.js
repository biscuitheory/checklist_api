const { v4: uuidv4 } = require('uuid');
const db = require('../models');
const list = require('../validators/list');

const { Task, List } = db;

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
      attributes: ['id', 'name', 'description'],
    });
  },
  getTaskById: (id) => {
    return Task.findByPk(id);
  },
  getTasksList: () => {
    return Task.findAll({
      include: [
        {
          model: List,
          through: {
            attributes: ['list_id'],
          },
        },
      ],
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
