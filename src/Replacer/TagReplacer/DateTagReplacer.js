const { format } = require('date-fns');
const BaseTagReplacer = require('./BaseTagReplacer');
const TagReplacerOptions = require('./TagReplacerOptions');
const TagReplacerOption = require('./TagReplacerOption');
const TagReplacerOptionKeys = require('./TagReplacerOptionKeys');

class DateTagReplacer extends BaseTagReplacer {
  constructor() {
    super('d', 'date');

    this.setOptions(
      new TagReplacerOptions()
        .addOption(new TagReplacerOption(TagReplacerOptionKeys.TYPE_DATE)),
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
    const originalDatePattern = 'YYYY-MM-DD';
    const datePattern = matcher.group(2) === null ? originalDatePattern : matcher.group(2);
    let newFileName = inputPattern;
    const formattedDate = format(new Date(), datePattern);

    newFileName = newFileName.replace(pattern, formattedDate);

    return newFileName;
  }
}

/**
 *
 * @type {DateTagReplacer}
 */
module.exports = DateTagReplacer;
