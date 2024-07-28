const { Sequelize } = require('sequelize');

const DB = new Sequelize({
  "username": "postgres",
  "password": "123456789",
  "database": "cms",
  "host": "localhost",
  "dialect": "postgres"
});

module.exports = DB;