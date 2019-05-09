const fsPromises = require('fs').promises

module.exports = {
  load: async (path, options = 'utf8') => {
    return fsPromises.readdir(path, options).then((dirnames)=> {
      return dirnames.map((dirname) => {
        return require('path').join(path, dirname)
      })
    })
  }
}
