const path = require('path');
const fsPromises = require('fs').promises;

module.exports = {
  load: async (filePath, options = 'utf8') => fsPromises.readdir(filePath, options)
    .then(directoryNames => directoryNames.map(dirname => path.join(filePath, dirname))),
};
