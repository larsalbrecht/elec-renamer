const path = require('path');
const Pattern = require('../Regex/Pattern');
const BaseTagReplacer = require('./BaseTagReplacer');
const TagReplacerOptions = require('./TagReplacerOptions');
const TagReplacerOption = require('./TagReplacerOption');
const TagReplacerOptionKeys = require('./TagReplacerOptionKeys');

class FolderTagReplacer extends BaseTagReplacer {
  constructor() {
    super('f', 'folder');

    this.setOptions(
      new TagReplacerOptions()
        .addOption(new TagReplacerOption(TagReplacerOptionKeys.TYPE_INT)) // upper directory
        .addOption(new TagReplacerOption(TagReplacerOptionKeys.TYPE_INT)) // start
        .addOption(new TagReplacerOption(TagReplacerOptionKeys.TYPE_INT)), // length
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
    let newName = null;

    const folderIndex = matcher.group(2) === null ? 0 : parseInt(matcher.group(2), 10);
    const fromLength = matcher.group(3) ? parseInt(matcher.group(3), 10) : null;
    const toLength = matcher.group(4) ? parseInt(matcher.group(4), 10) : null;
    const folderName = FolderTagReplacer.getFolderName(originalFile, folderIndex);

    if (toLength !== null) { // replace [f|<0-9>, <0-9>, <0-9>]
      if ((fromLength <= folderName.length)
        && ((fromLength + toLength) <= folderName.length)
        && (fromLength < (fromLength + toLength))) {
        newName = folderName.substring(fromLength, folderIndex + toLength);
      }
    } else if (fromLength !== null) { // replace [f|<0-9>, <0-9>]
      if (fromLength <= folderName.length) {
        newName = folderName.substring(fromLength);
      }
    }
    return fileNameMask.replace(pattern, newName);
  }

  static getFolderName(fileItem, folderIndex) {
    const filePath = FolderTagReplacer.getFilepath(fileItem);
    const pathsArr = filePath.split(Pattern.quote(path.sep));
    if (folderIndex < (pathsArr.length - 1)) {
      const reversePathsArr = pathsArr.reverse();
      return reversePathsArr[folderIndex];
    }
    return '';
  }

  static getFilepath(file) {
    const absolutePath = path.resolve(file);

    return absolutePath.substring(0, absolutePath.lastIndexOf(path.sep));
  }
}

/**
 *
 * @type {FolderTagReplacer}
 */
module.exports = FolderTagReplacer;
