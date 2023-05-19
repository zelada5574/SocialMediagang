const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection.js');

class Likes extends Model {
}


Likes.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    likedBlogId: {
      type: DataTypes.UUID,
      references: {
        model: 'blog',
        key: 'id',
      }
    },
    userLikedId: {
        type: DataTypes.UUID,
        references: {
            model: 'user',
            key: 'id',
        }
    },
    isLiked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    modelName: 'like',
  }
);

module.exports = Likes;