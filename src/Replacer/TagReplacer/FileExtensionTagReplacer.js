const path = require('path');
const BaseTagReplacer = require('./BaseTagReplacer');
const TagReplacerOptions = require('./TagReplacerOptions');
const TagReplacerOption = require('./TagReplacerOption');
const TagReplacerOptionKeys = require('./TagReplacerOptionKeys');

class FileExtensionTagReplacer extends BaseTagReplacer {
  constructor() {
    super('e', 'extension');

    this.setOptions(
      new TagReplacerOptions()
        .addOption(new TagReplacerOption(TagReplacerOptionKeys.TYPE_BOOL)),
    );
  }

  /**
   *
   * @param pattern {RegExp}
   * @param matcher {CustomMatch}
   * @param inputPattern {String}
   * @param inputString {String}
   * @param itemPos {Number}
   * @returns {String}
   */
  replace(pattern, matcher, inputPattern, inputString, itemPos) {
    let fileExtension = path.extname(inputString);
    let newFileName = inputPattern;

    if (fileExtension !== null && fileExtension !== '' && fileExtension !== '.') {
      if (matcher.group(2) === 'false') { // replace [extension, e]
        fileExtension = fileExtension.replace(/^(\.)(.*)/, '$2');
      }
      newFileName = newFileName.replace(pattern, fileExtension);
    }

    return newFileName;
  }
}

/**
 *
 * @type {FileExtensionTagReplacer}
 */
module.exports = FileExtensionTagReplacer;
