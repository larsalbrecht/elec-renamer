const path = require('path');
const BaseTagReplacer = require('./BaseTagReplacer');
const TagReplacerOptions = require('./TagReplacerOptions');
const TagReplacerOption = require('./TagReplacerOption');
const TagReplacerOptionKeys = require('./TagReplacerOptionKeys');

class NameTagReplacer extends BaseTagReplacer {
  constructor() {
    super('n', 'name');

    this.setOptions(
      new TagReplacerOptions()
        .addOption(new TagReplacerOption(TagReplacerOptionKeys.TYPE_INT))
        .addOption(new TagReplacerOption(TagReplacerOptionKeys.TYPE_INT)),
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
    const fileName = path.basename(inputString);
    let newFileName = inputPattern;
    let replaced = false;

    const fromLength = matcher.group(2) ? parseInt(matcher.group(2), 10) : null;
    const toLength = matcher.group(3) ? parseInt(matcher.group(3), 10) : null;

    if (matcher.group(3) != null) { // replace [n, <0-9>, <0-9>]
      if ((fromLength <= fileName.length)
        && ((fromLength + toLength) <= fileName.length)
        && (fromLength < (fromLength + toLength))) {
        newFileName = newFileName.replace(pattern,
          fileName.substring(fromLength, fromLength + toLength));
        replaced = true;
      }
    } else if (matcher.group(2) != null) { // replace [n, <0-9>]
      if (fromLength <= fileName.length) {
        newFileName = newFileName.replace(pattern, fileName.substring(fromLength));
        replaced = true;
      }
    } else { // replace [n]
      newFileName = newFileName.replace(pattern, fileName);
      replaced = true;
    }

    if (!replaced) { // replace unfound
      newFileName = newFileName.replace(pattern, '');
    }

    return newFileName;
  }
}

/**
 *
 * @type {NameTagReplacer}
 */
module.exports = NameTagReplacer;
