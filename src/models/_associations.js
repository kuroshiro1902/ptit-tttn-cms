const Category = require("./category");
const Comment = require("./comment");
const Post = require("./post");
const User = require("./user");

const _initAssociations = () => {
  // post - category
  Post.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });
  Category.hasMany(Post, { foreignKey: 'category_id', as: 'posts' });

  // post - author
  Post.belongsTo(User, { foreignKey: 'author_id', as: 'author' });
  User.hasMany(Post, { foreignKey: 'author_id', as: 'posts' });

  // comment - post
  Comment.belongsTo(Post, { foreignKey: 'post_id', as: 'post' });
  Post.hasMany(Comment, { foreignKey: 'post_id', as: 'comments' });

  // comment - author
  Comment.belongsTo(User, { foreignKey: 'author_id', as: 'author' });
  User.hasMany(Comment, { foreignKey: 'author_id', as: 'author' });
}

module.exports = _initAssociations