const Replacer = require('./Replacer')

const inputPath = require('path').resolve(process.cwd() + '/../example-data')

const app = async () => {
  const allData = await require('./DataServices/dataLoader').load(inputPath)
  const fileTypeFilteredData = require('./DataServices/dataFilter').fileExtensionFilter('.mkv').filter(allData)

  console.log(fileTypeFilteredData)

  // const patternString = '[c] [c,1]. ([f] | [f,2, 1, 1]) Supergirl - [n, 10, 6] - [n, 17]'
  const patternString = '[d, YYYY-m-d]'

  const replacer = Replacer()

  let i = 0
  const replacerPromises = fileTypeFilteredData.map((file) => {
    return replacer.getReplacement(patternString, file, i++)
  })

  const result = await Promise.all(replacerPromises)

  console.log(result)
}

app().catch((error) => {
  console.error(error)
})
//
// const listData = require('./Services/dataLoader').load('./example-data')
// listData.then((items) => {
//   console.log(items)
// })

//
// const replacer = new Replacer()
// replacer.loadReplacerActions()
// replacer.replace('[n]', [])
// replacer.getReplacement();

