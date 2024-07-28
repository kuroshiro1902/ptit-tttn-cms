const { DataTypes } = require('sequelize');
const DB = require('../database');

const User = DB.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  is_admin: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'users',
  underscored: true,
  timestamps: true
});

module.exports = User;
