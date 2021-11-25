'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: {
          name: 'user_id',
        },
      });
      this.hasMany(models.Task, {
        foreignKey: {
          name: 'list_id',
        },
      });
    }
  }
  List.init(
    {
      user_id: DataTypes.UUID,
      name: DataTypes.STRING,
      // rank: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'List',
    }
  );
  return List;
};
