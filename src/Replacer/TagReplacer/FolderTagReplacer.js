const Pattern = require('../Regex/Pattern');
const BaseTagReplacer = require('./BaseTagReplacer');
const TagReplacerOptions = require('./TagReplacerOptions');
const TagReplacerOption = require('./TagReplacerOption');

class FolderTagReplacer extends BaseTagReplacer {

  constructor() {
    super('f', 'folder');

    this.setOptions(
      TagReplacerOptions.new()
        .addOption(new TagReplacerOption(TagReplacerOptions.TYPE_INT)) // upper directory
        .addOption(new TagReplacerOption(TagReplacerOptions.TYPE_INT)) // start
        .addOption(new TagReplacerOption(TagReplacerOptions.TYPE_INT)) // length
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
    let folderName = require('path')
      .basename(originalFile);
    let replaced = false;
    let folderIndex = 0;
    let newName = null;

    if (matcher.group(2) == null) {
      folderIndex = 0;
    } else {
      folderIndex = parseInt(matcher.group(2));
    }

    newName = folderName = FolderTagReplacer.getFolderName(originalFile, folderIndex);

    if (matcher.group(4) != null) { // replace [f|<0-9>, <0-9>, <0-9>]
      if ((parseInt(matcher.group(3)) <= folderName.length)
        && ((parseInt(matcher.group(3)) + parseInt(matcher.group(4))) <= folderName.length)
        && (parseInt(matcher.group(3)) < (parseInt(matcher.group(3)) + parseInt(matcher.group(4))))) {
        newName = folderName.substring(parseInt(matcher.group(3)), parseInt(matcher.group(2)) + parseInt(matcher.group(4)));
      }
    } else if (matcher.group(3) !== null) { // replace [f|<0-9>, <0-9>]
      if (parseInt(matcher.group(3)) <= folderName.length) {
        newName = folderName.substring(parseInt(matcher.group(3)));
      }
    }
    fileNameMask = fileNameMask.replace(pattern, newName);

    return fileNameMask;
  }

  static getFolderName(fileItem, folderIndex) {
    const path = FolderTagReplacer.getFilepath(fileItem);
    const pathsArr = path.split(Pattern.quote(require('path').sep));
    if (folderIndex < (pathsArr.length - 1)) {
      const reversePathsArr = pathsArr.reverse();
      return reversePathsArr[folderIndex];
    }
    return '';
  }

  static getFilepath(file) {
    const absolutePath = require('path')
      .resolve(file);
    return absolutePath.substring(0, absolutePath.lastIndexOf(require('path').sep));
  }
}

/**
 *
 * @type {FolderTagReplacer}
 */
module.exports = FolderTagReplacer;
