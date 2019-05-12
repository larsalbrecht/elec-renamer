const BaseTagReplacer = require('./BaseTagReplacer');
const TagReplacerOptionKeys = require('./TagReplacerOptionKeys');
const TagReplacerOptions = require('./TagReplacerOptions');
const TagReplacerOption = require('./TagReplacerOption');

class TextSizeTagReplacer extends BaseTagReplacer {
  constructor() {
    super('ts', 'text-size');

    this.setOptions(
      new TagReplacerOptions(true)
        .addOption(new TagReplacerOption(TagReplacerOptionKeys.TYPE_STRINGLIST, new Map([['required', true], ['case-sensitive', false], ['list', ['u', 'l', 'wu', 'wl']]]))),
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
    let newFileName = inputPattern;
    if (matcher.group(3) != null) { // replace [ts, text-size]
      if (matcher.group(2) === 'u') {
        newFileName = newFileName.replace(pattern, matcher.group(3)
          .toUpperCase());
      } else if (matcher.group(2) === 'l') {
        newFileName = newFileName.replace(pattern, matcher.group(3)
          .toLowerCase());
      } else if (matcher.group(2) === 'wu') {
        newFileName = newFileName.replace(pattern, matcher.group(3)
          .split(' ')
          .map(word => word.charAt(0)
            .toUpperCase() + word.slice(1)));
      } else if (matcher.group(2) === 'wl') {
        newFileName = newFileName.replace(pattern, matcher.group(3)
          .split(' ')
          .map(word => word.charAt(0)
            .toLowerCase() + word.slice(1)));
      } else {
        newFileName = newFileName.replace(pattern, matcher.group(3));
      }
    }

    return newFileName;
  }
}

/**
 *
 * @type {TextSizeTagReplacer}
 */
module.exports = TextSizeTagReplacer;
