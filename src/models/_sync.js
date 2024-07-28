
const DB = require('../database');
const _modelSync = async () => {
  try {
    await DB.authenticate();
    console.log('Connection has been established successfully.');
    
    // Đồng bộ mô hình với cơ sở dữ liệu
    await DB.sync();
    console.log('Database synchronized.');

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = _modelSync;