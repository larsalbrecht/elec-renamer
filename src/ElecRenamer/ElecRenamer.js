const fs = require('fs');
const path = require('path');
const Replacer = require('../Replacer');

class ElecRenamer {
  constructor() {
    this.inputPattern = '';
    this.filePathList = [];
    this.filePathListPreview = null;
    this.replacer = new Replacer(null, null);
  }

  async generateFileListPreview() {
    const filePathListPreviewPromises = this.filePathList.map((filePath, index) => this.replacer.getReplacement(this.inputPattern, filePath, index)
      .catch((error) => {
        throw new Error(`Error while replacing for preview: ${error}`);
      }));

    this.filePathListPreview = Promise.all(filePathListPreviewPromises);
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

  async renameFiles() {
    this.filePathList = await this.filePathList.map((filePath, index) => {
      const basePath = path.dirname(filePath);
      const newFullyFilePath = path.join(basePath, this.filePathListPreview[index]);
      fs.rename(filePath, newFullyFilePath, (error) => {
        if (error) throw Error(error);
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
