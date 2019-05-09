const NameTagReplacer = require('./TagReplacer/NameTagReplacer')
const FolderTagReplacer = require('./TagReplacer/FolderTagReplacer')
const CounterTagReplacer = require('./TagReplacer/CounterTagReplacer')
const FileExtensionTagReplacer = require('./TagReplacer/FileExtensionTagReplacer')
const TextSizeTagReplacer = require('./TagReplacer/TextSizeTagReplacer')
const DateTagReplacer = require('./TagReplacer/DateTagReplacer')

class Replacer {

  constructor (inputReplacerList, tagReplacerList) {
    this.inputReplacerList = inputReplacerList ? inputReplacerList : []
    this.tagReplacerList = tagReplacerList ? tagReplacerList : []

    this.tagReplacerList.push(new NameTagReplacer())
    this.tagReplacerList.push(new FolderTagReplacer())
    this.tagReplacerList.push(new CounterTagReplacer())
    this.tagReplacerList.push(new FileExtensionTagReplacer())
    this.tagReplacerList.push(new TextSizeTagReplacer())
    this.tagReplacerList.push(new DateTagReplacer())
  }

  /**
   *
   * @param inputPattern {String}
   * @param inputItem {String}
   * @param itemPos {Number}
   */
  async getReplacement (inputPattern, inputItem, itemPos) {
    this.tagReplacerList.forEach((tagReplacer) => {
      inputPattern = tagReplacer.getReplacement(inputPattern, inputItem, itemPos)
    })

    this.inputReplacerList.forEach((inputReplacer) => {
      inputPattern = inputReplacer.getReplacement(inputPattern, inputItem, itemPos)
    })

    return inputPattern
  }

}

/**
 *
 * @returns {Replacer}
 */
module.exports = () => new Replacer()

