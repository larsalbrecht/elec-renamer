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
    let newFileName = fileNameMask;
    let formattedDate = null;

    try {
      formattedDate = format(new Date(), datePattern);
    } catch (error) {
      console.log(error);
      formattedDate = format(new Date(), origDatePattern);
    }
    newFileName = newFileName.replace(pattern, formattedDate);

    return newFileName;
  }
}

/**
 *
 * @type {DateTagReplacer}
 */
module.exports = DateTagReplacer;
