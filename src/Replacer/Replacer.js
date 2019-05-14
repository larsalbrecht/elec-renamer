const NameTagReplacer = require('./TagReplacer/NameTagReplacer');
const FolderTagReplacer = require('./TagReplacer/FolderTagReplacer');
const CounterTagReplacer = require('./TagReplacer/CounterTagReplacer');
const FileExtensionTagReplacer = require('./TagReplacer/FileExtensionTagReplacer');
const TextSizeTagReplacer = require('./TagReplacer/TextSizeTagReplacer');
const DateTagReplacer = require('./TagReplacer/DateTagReplacer');

class Replacer {
  /**
   *
   * @param inputReplacerList {BaseInputReplacer}
   * @param tagReplacerList {BaseTagReplacer}
   */
  constructor(inputReplacerList, tagReplacerList) {
    this.inputReplacerList = inputReplacerList || [];
    this.tagReplacerList = tagReplacerList || [];

    this.tagReplacerList.push(new NameTagReplacer());
    this.tagReplacerList.push(new FolderTagReplacer());
    this.tagReplacerList.push(new CounterTagReplacer());
    this.tagReplacerList.push(new FileExtensionTagReplacer());
    this.tagReplacerList.push(new TextSizeTagReplacer());
    this.tagReplacerList.push(new DateTagReplacer());
  }

  /**
   *
   * @param inputPattern {String}
   * @param inputItem {String}
   * @param itemPos {Number}
   */
  async getReplacement(inputPattern, inputItem, itemPos) {
    let resultPattern = inputPattern;

    this.tagReplacerList.forEach((tagReplacer) => {
      resultPattern = tagReplacer.getReplacement(resultPattern, inputItem, itemPos);
    });

    this.inputReplacerList.forEach((inputReplacer) => {
      resultPattern = inputReplacer.getReplacement(resultPattern, inputItem, itemPos);
    });

    return resultPattern;
  }
}

module.exports = Replacer;
