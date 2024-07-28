const _modelSync = require("./_sync");
const _initAssociations = require("./_associations");

module.exports = {
  init: async () => {
    _initAssociations();
    await _modelSync();
  }
  
}