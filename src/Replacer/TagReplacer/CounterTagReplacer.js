const BaseTagReplacer = require('./BaseTagReplacer')
const TagReplacerOptions = require('./TagReplacerOptions')
const TagReplacerOption = require('./TagReplacerOption')

class CounterTagReplacer extends BaseTagReplacer {

  constructor () {
    super('c', 'counter')

    this.setOptions(
      TagReplacerOptions.new()
        .addOption(new TagReplacerOption(TagReplacerOptions.TYPE_INT))
        .addOption(new TagReplacerOption(TagReplacerOptions.TYPE_INT))
        .addOption(new TagReplacerOption(TagReplacerOptions.TYPE_INT))
    )
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
  replace (pattern, matcher, fileNameMask, originalFile, itemPos) {
    let start = 0
    let step = 1
    let intWidth = 0

    let fileName = require('path').basename(originalFile)
    let replaced = false

    if (matcher.group(4) != null) { // replace [c, <0-9>, <0-9>, <0-9>]
      start = (matcher.group(2) != null ? parseInt(matcher.group(2)) : start)
      step = (matcher.group(3) != null ? parseInt(matcher.group(3)) : step)
      intWidth = (matcher.group(4) != null ? parseInt(matcher.group(4)) : intWidth)
    } else if (matcher.group(3) != null) { // replace [c, <0-9>, <0-9>]
      start = (matcher.group(2) != null ? parseInt(matcher.group(2)) : start)
      step = (matcher.group(3) != null ? parseInt(matcher.group(3)) : step)
    } else if (matcher.group(2) != null) { // replace [c, <0-9>]
      start = (matcher.group(2) != null ? parseInt(matcher.group(2)) : start)
    }

    fileNameMask = fileNameMask.replace(pattern, ((itemPos * step) + start).toString(10).padStart(intWidth, '0'))

    return fileNameMask
  }

}

/**
 *
 * @type {CounterTagReplacer}
 */
module.exports = CounterTagReplacer
