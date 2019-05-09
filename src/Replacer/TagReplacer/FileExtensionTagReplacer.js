const Pattern = require('../Regex/Pattern')
const BaseTagReplacer = require('./BaseTagReplacer')
const TagReplacerOptions = require('./TagReplacerOptions')
const TagReplacerOption = require('./TagReplacerOption')

class FileExtensionTagReplacer extends BaseTagReplacer {

  constructor () {
    super('e', 'extension')

    this.setOptions(
      TagReplacerOptions.new()
        .addOption(new TagReplacerOption(TagReplacerOptions.TYPE_BOOL))
    )
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
  replace (pattern, matcher, fileNameMask, originalFile, itemPos) {
    let fileExtension = require('path').extname(originalFile)

    if (fileExtension !== null && fileExtension !== '' && fileExtension !== '.') {
      if (matcher.group(2) === 'false') { // replace [extension, e]
        fileExtension = fileExtension.replace(/^(\.)(.*)/, '$2')
      }
      fileNameMask = fileNameMask.replace(pattern, fileExtension);
    }

    return fileNameMask
  }
}

/**
 *
 * @type {FileExtensionTagReplacer}
 */
module.exports = FileExtensionTagReplacer
