const BaseTagReplacer = require('./BaseTagReplacer');
const TagReplacerOptions = require('./TagReplacerOptions');
const TagReplacerOption = require('./TagReplacerOption');
const TagReplacerOptionKeys = require('./TagReplacerOptionKeys');

class CounterTagReplacer extends BaseTagReplacer {
  constructor() {
    super('c', 'counter');

    this.setOptions(
      new TagReplacerOptions()
        .addOption(new TagReplacerOption(TagReplacerOptionKeys.TYPE_INT))
        .addOption(new TagReplacerOption(TagReplacerOptionKeys.TYPE_INT))
        .addOption(new TagReplacerOption(TagReplacerOptionKeys.TYPE_INT)),
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
    const start = matcher.group(2) ? parseInt(matcher.group(2), 10) : 0;
    const step = matcher.group(3) ? parseInt(matcher.group(3), 10) : 1;
    const intWidth = matcher.group(4) ? parseInt(matcher.group(4), 10) : 0;

    return fileNameMask.replace(pattern, ((itemPos * step) + start).toString(10)
      .padStart(intWidth, '0'));
  }
}

/**
 *
 * @type {CounterTagReplacer}
 */
module.exports = CounterTagReplacer;
