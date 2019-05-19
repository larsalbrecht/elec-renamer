const commander = require('commander');
const ElecRenamer = require('./ElecRenamer');
const dataLoader = require('./DataServices/dataLoader');

commander.version('1.0.0');

commander.option('-i, --input-pattern [input-pattern]', 'Input Pattern to use', '[n]');
commander.option('-p, --paths [paths]', 'Files / Paths to use', dataLoader.listFilePathsRecursiveSync, []);

commander.parse(process.argv);

const pattern = commander.inputPattern;

if (!Array.isArray(commander.paths) || commander.paths.length === 0) {
  process.exit(1);
}

const elecRenamer = new ElecRenamer();
elecRenamer.setInputPattern(pattern);
elecRenamer.setFilePathList(commander.paths);
elecRenamer.renameFiles()
  .catch((error) => {
    console.error(error);
  });
