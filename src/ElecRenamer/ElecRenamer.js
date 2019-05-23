const fs = require('fs').promises;
const path = require('path');
const Replacer = require('../Replacer');

class ElecRenamer {
  constructor() {
    this.inputPattern = '[n]';
    this.filePathList = [];
    this.replaceList = [];
    this.filePathListPreview = null;
    this.replacer = new Replacer(null, null);
  }

  async generateFileListPreview() {
    if (typeof this.inputPattern !== 'string') {
      throw new Error('Input Pattern must be set to type String!');
    }
    const filePathListPreviewPromises = this.filePathList.map((filePath, index) => {
      let tempInputPattern = this.inputPattern;
      if (this.replaceList.length > 0 && this.replaceList.length - 1 >= index) {
        tempInputPattern = tempInputPattern.replace(/\$list\$/g, `"${this.replaceList[index]}"`);
      } else {
        tempInputPattern = tempInputPattern.replace(/\$list\$/g, `"${filePath}"`);
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
   * @param filePathList {Array<String>}
   */
  setFilePathList(filePathList) {
    this.filePathList = filePathList;
  }

  /**
   *
   * @param filePathList {Array<String>}
   */
  addFilePathList(filePathList) {
    this.filePathList = [...this.filePathList, ...filePathList];
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
   * @param inputPattern {String}
   */
  setInputPattern(inputPattern) {
    this.inputPattern = inputPattern;
  }

  /**
   *
   * @param replaceList {Array<String>}
   */
  setReplaceList(replaceList) {
    this.replaceList = replaceList;
  }

  async renameFiles() {
    if (this.filePathListPreview === null) {
      await this.generateFileListPreview();
    }
    this.filePathList = await this.filePathList.map((filePath, index) => {
      const basePath = path.dirname(filePath);
      const newFullyFilePath = path.join(basePath, this.filePathListPreview[index]);
      fs.rename(filePath, newFullyFilePath)
        .catch((error) => {
          throw new Error(`Error while renaming files: ${error}`);
        });

      return newFullyFilePath;
    });
  }

  /**
   *
   * @returns {Array<String>}
   */
  getFilePathList() {
    return this.filePathList;
  }
}

module.exports = ElecRenamer;
