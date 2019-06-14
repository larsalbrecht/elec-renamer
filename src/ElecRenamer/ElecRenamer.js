const fs = require('fs').promises;
const path = require('path');
const Replacer = require('../Replacer');
const BaseInputReplace = require('../Replacer/InputReplacer/BaseInputReplacer');

class ElecRenamer {
  constructor() {
    this.defaultInputPattern = '[n]';
    this.inputPattern = this.defaultInputPattern;
    this.filePathList = [];
    this.fileExtensionFilter = '';
    this.generatedFilePathList = [];
    this.replaceList = [];
    this.filePathListPreview = null;
    this.replacer = new Replacer();
  }

  generateFilePathList() {
    this.generatedFilePathList = this.filePathList.filter((filePathListItem) => {
      if (this.fileExtensionFilter !== '') {
        if (!filePathListItem.endsWith(`.${this.fileExtensionFilter}`)) {
          return false;
        }
      }
      return true;
    });
  }

  async generateFileListPreview() {
    if (typeof this.inputPattern !== 'string') {
      throw new Error('Input Pattern must be set to type String!');
    }
    const filePathListPreviewPromises = this.generatedFilePathList.map((filePath, index) => {
      let tempInputPattern = this.inputPattern;
      if (this.replaceList.length > 0 && this.replaceList.length - 1 >= index) {
        tempInputPattern = tempInputPattern.replace(/\$list\$/g, `"${this.replaceList[index]}"`);
      } else {
        tempInputPattern = tempInputPattern.replace(/\$list\$/g, `"${path.basename(filePath)}"`);
      }
      return this.replacer.getReplacement(tempInputPattern, filePath, index)
        .catch((error) => {
          throw new Error(`Error while replacing for preview: ${error}`);
        });
    });

    this.filePathListPreview = await Promise.all(filePathListPreviewPromises);

    return this.filePathListPreview;
  }

  /**
   *
   * @param inputPattern {String}
   */
  setInputPattern(inputPattern) {
    this.inputPattern = inputPattern;
    this.generateFilePathList();
  }

  /**
   *
   * @param replaceList {Array<String>}
   */
  setReplaceList(replaceList) {
    this.replaceList = replaceList;
    this.generateFilePathList();
  }

  /**
   *
   * @param newFileExtensionFilter {String}
   */
  setFileExtensionFilter(newFileExtensionFilter) {
    this.fileExtensionFilter = newFileExtensionFilter;
    this.generateFilePathList();
  }

  /**
   *
   * @param filePathList {Array<String>}
   */
  setFilePathList(filePathList) {
    this.filePathList = filePathList;
    this.generateFilePathList();
  }

  /**
   *
   * @param filePathList {Array<String>}
   */
  addFilePathList(filePathList) {
    this.filePathList = [...this.filePathList, ...filePathList];
    this.generateFilePathList();
  }

  /**
   *
   * @returns {Array<String>|null}
   */
  getPreviewFilePathList() {
    return this.filePathListPreview;
  }

  /**
   *
   * @returns {String[]}
   */
  getReplaceList() {
    return this.replaceList;
  }


  async renameFiles() {
    if (this.filePathListPreview === null) {
      await this.generateFileListPreview();
    }

    const newFilePathList = await this.generatedFilePathList.map((filePath, index) => {
      const basePath = path.dirname(filePath);
      const newFullyFilePath = path.join(basePath, this.filePathListPreview[index]);

      fs.rename(filePath, newFullyFilePath)
        .catch((error) => {
          throw new Error(`Error while renaming files: ${error}`);
        });

      this.inputPattern = this.defaultInputPattern;

      return newFullyFilePath;
    });

    this.setFilePathList(newFilePathList);
  }

  clear() {
    this.filePathList = [];
    this.inputPattern = this.defaultInputPattern;
    this.filePathListPreview = null;
    this.generatedFilePathList = [];
    this.generateFilePathList();
  }

  /**
   *
   * @returns {Array<String>}
   */
  getFilePathList() {
    return this.generatedFilePathList;
  }

  /**
   *
   * @returns {String}
   */
  getInputPattern() {
    return this.inputPattern;
  }

  /**
   *
   * @param newInputReplacer {Object}
   */
  addInputReplacer(newInputReplacer) {
    const inputReplacer = BaseInputReplace.fromData(newInputReplacer);
    this.replacer.addInputReplacer(inputReplacer);
    this.generateFilePathList();
  }

  updateInputReplacer(index, updatedInputReplacer) {
    const inputReplacer = BaseInputReplace.fromData(updatedInputReplacer);
    this.replacer.setInputReplacer(index, inputReplacer);
    this.generateFilePathList();
  }

  /**
   *
   * @param index {Number}
   */
  removeInputReplacer(index) {
    this.replacer.removeInputReplacer(index);
    this.generateFilePathList();
  }
}

module.exports = ElecRenamer;
