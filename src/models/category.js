const { DataTypes } = require('sequelize');
const DB = require('../database');

const Category = DB.define('Category', {
  name: DataTypes.STRING
}, {
  tableName: 'categories',
  underscored: true,
  timestamps: true
});

module.exports = Category;
