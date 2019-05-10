const BaseTagReplacer = require('./BaseTagReplacer');
const TagReplacerOptions = require('./TagReplacerOptions');
const TagReplacerOption = require('./TagReplacerOption');
const format = require('date-fns').format;

class DateTagReplacer extends BaseTagReplacer {

  constructor() {
    super('d', 'date');

    this.setOptions(
      TagReplacerOptions.new()
        .addOption(new TagReplacerOption(TagReplacerOptions.TYPE_DATE))
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
    const origDatePattern = 'YYYY-MM-DD';
    const datePattern = matcher.group(2) === null ? origDatePattern : matcher.group(2);
    let formattedDate = null;

    try {
      formattedDate = format(new Date(), datePattern);
    } catch (error) {
      console.log(error);
      formattedDate = format(new Date(), origDatePattern);
    }
    fileNameMask = fileNameMask.replace(pattern, formattedDate);

    return fileNameMask;
  }

}

/**
 *
 * @type {DateTagReplacer}
 */
module.exports = DateTagReplacer;
