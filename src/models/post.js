const { DataTypes } = require('sequelize');
const DB = require('../database');
const Category = require('./category');

const Post = DB.define('Post', {
  title: DataTypes.STRING,
  content: DataTypes.TEXT,
  view: DataTypes.INTEGER,
  author_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  category_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'categories',
      key: 'id',
    },
    allowNull: true
  }
}, {
  tableName: 'posts',
  underscored: true,
  timestamps: true
});

module.exports = Post;
