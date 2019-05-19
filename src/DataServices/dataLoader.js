const path = require('path');
const fsPromises = require('fs').promises;
const fsSync = require('fs');

const dataLoader = {
  listFilePaths: async (filePath, options = 'utf8') => {
    const directoryNames = await fsPromises.readdir(filePath, options);
    const absoluteDirectoryNames = directoryNames.map(directoryName => path.resolve(path.join(filePath, directoryName)));
    return absoluteDirectoryNames.filter((directoryName) => {
      const stat = fsSync.lstatSync(directoryName);
      return stat.isFile();
    });
  },

  listFilePathsRecursive: async (filePath, paths = [], options = 'utf8') => {
    let absoluteReturnPaths = paths.map(singlePath => path.resolve(singlePath));
    const absoluteFilePath = path.resolve(filePath);
    const stat = await fsPromises.lstat(absoluteFilePath);
    if (stat.isFile()) {
      absoluteReturnPaths.push(absoluteFilePath);
    }
    if (!stat.isFile() && stat.isDirectory()) {
      absoluteReturnPaths = (await Promise.all(await fsPromises.readdir(absoluteFilePath, options))
        .then(async subFilePaths => Promise.all(subFilePaths.map(async subFilePath => dataLoader.listFilePathsRecursive(path.join(absoluteFilePath, subFilePath), [], options)))));
    }

    return absoluteReturnPaths.flat();
  },
  listFilePathsRecursiveSync: (filePath, filesToReturn = []) => {
    const absoluteFilePath = path.resolve(filePath);
    const stat = fsSync.lstatSync(absoluteFilePath);

    if (stat.isFile()) {
      filesToReturn.push(absoluteFilePath);
    }
    if (stat.isDirectory()) {
      const dirFiles = fsSync.readdirSync(absoluteFilePath)
        .map(fileName => path.join(absoluteFilePath, fileName));

      dirFiles.forEach((subFilePath) => {
        dataLoader.listFilePathsRecursiveSync(subFilePath, filesToReturn);
      });
    }

    return filesToReturn;
  },
};

module.exports = dataLoader;
