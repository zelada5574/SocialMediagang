const Blog = require('./Blog');
const User = require('./User');
const Comment = require('./Comment');
const Likes = require('./Likes');

User.hasMany(Blog, {
  foreignKey: 'userId',
  // if we delete user, delete all their todos as well
  onDelete: 'CASCADE',
});

Blog.belongsTo(User, {
  foreignKey: 'userId',
});

Blog.hasMany(Comment, {
  foreignKey: 'blogId',
  //if we delete the blogpost, we delete all comments
  onDelete: 'CASCADE',
});

Comment.belongsTo(Blog, {
  foreignKey: 'blogId', 
});

User.hasMany(Comment, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
  foreignKey: 'userId',
});

User.hasMany(Likes, {
  foreignKey: 'userLikedId',
  onDelete: 'CASCADE',
  });

Likes.belongsTo(User, {
  foreignKey: 'userLikedId',
});

Blog.hasMany(Likes, {
  foreignKey: 'likedBlogId',
  onDelete: 'CASCADE',
});

Likes.belongsTo(Blog, {
  foreignKey: 'likedBlogId',
});


module.exports = {
  Blog,
  User,
  Comment,
  Likes,
};