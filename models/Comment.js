const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection.js');

class Comment extends Model {
}


Comment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    blogId: {
      type: DataTypes.UUID,
      references: {
        model: 'blog',
        key: 'id',
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'user',
        key: 'username',
      }
    },
    totalLikes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    modelName: 'comment',
    // timestamps: false,
  }
);

module.exports = Comment;