const BaseTagReplacer = require('./BaseTagReplacer');
const TagReplacerOptions = require('./TagReplacerOptions');
const TagReplacerOption = require('./TagReplacerOption');
const TagReplacerOptionKeys = require('./TagReplacerOptionKeys');

class TextTagReplacer extends BaseTagReplacer {
  constructor() {
    super('t', 'text');

    this.setOptions(
      new TagReplacerOptions()
        .addOption(new TagReplacerOption(TagReplacerOptionKeys.TYPE_STRING, new Map([['required', true]]))),
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
    const text = matcher.group(2);

    return inputPattern.replace(pattern, text);
  }
}

/**
 *
 * @type {TextTagReplacer}
 */
module.exports = TextTagReplacer;
