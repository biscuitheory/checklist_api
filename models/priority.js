'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Priority extends Model {
    static associate(models) {
      this.hasMany(models.Task, {
        foreignKey: {
          name: 'priority_id',
        },
      });
    }
  }
  Priority.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Priority',
    }
  );
  return Priority;
};
