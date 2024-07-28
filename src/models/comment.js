const { DataTypes } = require('sequelize');
const DB = require('../database');

const Comment = DB.define('Comment', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  author_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  post_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'posts',
      key: 'id'
    }
  }
}, {
  tableName: 'comments',
  underscored: true,
  timestamps: true
});

module.exports = Comment;
