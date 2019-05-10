const path = require('path');
const Replacer = require('./Replacer');
const dataLoader = require('./DataServices/dataLoader');
const dataFilter = require('./DataServices/dataFilter');

const inputPath = path.resolve(`${process.cwd()}/../example-data`);

const app = async () => {
  const allData = await dataLoader
    .load(inputPath);
  const fileTypeFilteredData = dataFilter
    .fileExtensionFilter('.mkv')
    .filter(allData);

  console.log(fileTypeFilteredData);

  // const patternString = '[c] [c,1]. ([f] | [f,2, 1, 1]) Supergirl - [n, 10, 6] - [n, 17]'
  const patternString = '[d, YYYY-MM-DD]';

  const replacer = Replacer();

  let i = 0;
  const replacerPromises = fileTypeFilteredData.map((file) => {
    i += 1;
    return replacer.getReplacement(patternString, file, i);
  });

  const result = await Promise.all(replacerPromises);

  console.log(result);
};

app()
  .catch((error) => {
    console.error(error);
  });
