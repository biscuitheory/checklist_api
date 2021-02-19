'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      this.belongsTo(models.List, {
        foreignKey: {
          name: 'list_id',
        },
      });
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
      list_id: DataTypes.UUID,
      priority_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Task',
    }
  );
  return Task;
};
