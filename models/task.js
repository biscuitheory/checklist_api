'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      this.belongsTo(models.Priority, {
        foreignKey: {
          name: 'priority_id',
        },
      });
    }
  }
  Task.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Task',
    }
  );
  return Task;
};
