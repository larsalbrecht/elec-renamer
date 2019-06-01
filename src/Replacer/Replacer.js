const NameTagReplacer = require('./TagReplacer/NameTagReplacer');
const FolderTagReplacer = require('./TagReplacer/FolderTagReplacer');
const CounterTagReplacer = require('./TagReplacer/CounterTagReplacer');
const FileExtensionTagReplacer = require('./TagReplacer/FileExtensionTagReplacer');
const TextSizeTagReplacer = require('./TagReplacer/TextSizeTagReplacer');
const DateTagReplacer = require('./TagReplacer/DateTagReplacer');
const TextTagReplacer = require('./TagReplacer/TextTagReplacer');

class Replacer {
  /**
   *
   * @param inputReplacerList {BaseInputReplacer[]}
   * @param tagReplacerList {BaseTagReplacer[]}
   */
  constructor(inputReplacerList = [], tagReplacerList = []) {
    this.inputReplacerList = inputReplacerList || [];
    this.tagReplacerList = tagReplacerList || [];

    this.tagReplacerList.push(new NameTagReplacer());
    this.tagReplacerList.push(new FolderTagReplacer());
    this.tagReplacerList.push(new CounterTagReplacer());
    this.tagReplacerList.push(new FileExtensionTagReplacer());
    this.tagReplacerList.push(new TextSizeTagReplacer());
    this.tagReplacerList.push(new TextTagReplacer());
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
      resultPattern = inputReplacer.getReplacement(resultPattern);
    });

    return resultPattern;
  }

  /**
   *
   * @param inputReplacer {Object}
   */
  addInputReplacer(inputReplacer) {
    this.inputReplacerList.push(inputReplacer);
  }

  /**
   *
   * @param index {Number}
   * @param inputReplacer {BaseInputReplacer}
   */
  setInputReplacer(index, inputReplacer) {
    if (!this.inputReplacerIndexExists(index)) {
      throw new Error(`No index "${index}" exists!`);
    }
    this.inputReplacerList[index] = inputReplacer;
  }

  /**
   *
   * @param index {Number}
   */
  removeInputReplacer(index) {
    if (!this.inputReplacerIndexExists(index)) {
      throw new Error(`No index "${index}" exists!`);
    }

    this.inputReplacerList.splice(index, 1);
  }

  /**
   *
   * @param index {Number}
   * @returns {boolean}
   */
  inputReplacerIndexExists(index) {
    if (this.inputReplacerList.length === 0) return false;
    if (index < 0) return false;
    return index <= this.inputReplacerList.length - 1;
  }
}

module.exports = Replacer;
