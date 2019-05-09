const Pattern = require('../Regex/Pattern')
const BaseTagReplacer = require('./BaseTagReplacer')
const TagReplacerOptions = require('./TagReplacerOptions')
const TagReplacerOption = require('./TagReplacerOption')

const keyValue = {
  new: (key, value) => {
    if (typeof key !== 'string') {
      throw new Error('Key is not a string!')
    }
    const objectLiteral = {key: key, value: value}
    Object.seal(objectLiteral)
    return objectLiteral
  }
}

class TextSizeTagReplacer extends BaseTagReplacer {

  constructor () {
    super('ts', 'text-size')

    this.setOptions(
      TagReplacerOptions.new(true)
        .addOption(new TagReplacerOption(TagReplacerOptions.TYPE_STRINGLIST, new Map([['required', true], ['case-sensitive', false], ['list', ['u', 'l', 'wu', 'wl']]])))
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
    if (matcher.group(3) != null) { // replace [ts, text-size]
      if (matcher.group(2) === 'u') {
        fileNameMask = fileNameMask.replace(pattern, matcher.group(3).toUpperCase())
      } else if (matcher.group(2) === 'l') {
        fileNameMask = fileNameMask.replace(pattern, matcher.group(3).toLowerCase())
      } else if (matcher.group(2) === 'wu') {
        fileNameMask = fileNameMask.replace(pattern, matcher.group(3).split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)))
      } else if (matcher.group(2) === 'wl') {
        fileNameMask = fileNameMask.replace(pattern, matcher.group(3).split(' ').map((word) => word.charAt(0).toLowerCase() + word.slice(1)))
      } else {
        fileNameMask = fileNameMask.replace(pattern, matcher.group(3))
      }
    }

    return fileNameMask
  }
}

/**
 *
 * @type {TextSizeTagReplacer}
 */
module.exports = TextSizeTagReplacer
