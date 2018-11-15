'use strict';

var fs = require('fs');
var path = require('path');

module.exports = {
  getCurrentDirectoryBase: function getCurrentDirectoryBase() {
    return path.basename(process.cwd());
  },

  directoryExists: function directoryExists(filePath) {
    try {
      return fs.statSync(filePath).isDirectory();
    } catch (err) {
      return false;
    }
  }
};