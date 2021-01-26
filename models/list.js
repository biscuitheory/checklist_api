'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: {
          name: 'user_id',
        },
      });
      this.hasMany(models.Task, {
        foreignKey: {
          name: 'task_id',
        },
      });
    }
  }
  List.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'List',
    }
  );
  return List;
};
