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
   * @param pattern {String}
   * @param matcher {String}
   * @param fileNameMask {String}
   * @param originalFile {String}
   * @param itemPos {Number}
   * @returns {String}
   */
  replace(pattern, matcher, fileNameMask, originalFile, itemPos) {
    let fileExtension = path.extname(originalFile);
    let newFileName = fileNameMask;

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
