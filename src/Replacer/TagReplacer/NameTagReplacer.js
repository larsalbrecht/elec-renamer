const BaseTagReplacer = require('./BaseTagReplacer');
const TagReplacerOptions = require('./TagReplacerOptions');
const TagReplacerOption = require('./TagReplacerOption');

class NameTagReplacer extends BaseTagReplacer {

  constructor() {
    super('n', 'name');

    this.setOptions(
      TagReplacerOptions.new()
        .addOption(new TagReplacerOption(TagReplacerOptions.TYPE_INT))
        .addOption(new TagReplacerOption(TagReplacerOptions.TYPE_INT))
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
    let fileName = require('path')
      .basename(originalFile);
    let replaced = false;

    if (matcher.group(3) != null) { // replace [n, <0-9>, <0-9>]
      if ((parseInt(matcher.group(2)) <= fileName.length)
        && ((parseInt(matcher.group(2)) + parseInt(matcher.group(3))) <= fileName.length)
        && (parseInt(matcher.group(2)) < (parseInt(matcher.group(2)) + parseInt(matcher.group(3))))) {
        fileNameMask = fileNameMask.replace(pattern,
          fileName.substring(parseInt(matcher.group(2)), parseInt(matcher.group(2)) + parseInt(matcher.group(3))));
        replaced = true;
      }
    } else if (matcher.group(2) != null) { // replace [n, <0-9>]
      if (parseInt(matcher.group(2)) <= fileName.length) {
        fileNameMask = fileNameMask.replace(pattern, fileName.substring(parseInt(matcher.group(2))));
        replaced = true;
      }
    } else { // replace [n]
      fileNameMask = fileNameMask.replace(pattern, fileName);
      replaced = true;
    }

    if (!replaced) { // replace unfound
      fileNameMask = fileNameMask.replace(pattern, '');
    }

    return fileNameMask;
  }

}

/**
 *
 * @type {NameTagReplacer}
 */
module.exports = NameTagReplacer;
