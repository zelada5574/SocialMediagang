const Blog = require('./Blog');
const User = require('./User');
const Comment = require('./Comment');
const Likes = require('./Likes');

User.hasMany(Blog, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Blog.belongsTo(User, {
  foreignKey: 'userId',
});

Blog.hasMany(Comment, {
  foreignKey: 'blogId',
  onDelete: 'CASCADE',
});

Comment.belongsTo(Blog, {
  foreignKey: 'blogId', 
});

User.hasMany(Comment, {
  foreignKey: 'userCommentId',
  onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
  foreignKey: 'userCommentId',
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