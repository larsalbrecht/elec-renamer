const TagReplacerOption = require('./TagReplacerOption')

class TagReplacerOptions {

  constructor (hasEndTag = false) {
    /**
     *
     * @type {TagReplacerOption[]}
     */
    this.options = []

    /**
     *
     * @type {boolean}
     */
    this.hasEndtag = hasEndTag
  }

  /**
   *
   * @param option {TagReplacerOption}
   * @returns {TagReplacerOptions}
   */
  addOption (option) {
    this.options.push(option)

    return this
  }

  isHasEndtag () {
    return this.hasEndtag
  }

  /**
   *
   * @returns {TagReplacerOption[]}
   */
  getOptions () {
    return this.options
  }
}

module.exports = {
  new: (hasEndTag = false) => new TagReplacerOptions(hasEndTag),
  /**
   *
   * @type {number}
   */
  TYPE_STRING: 0,

  /**
   *
   * @type {number}
   */
  TYPE_INT: 1,

  /**
   *
   * @type {number}
   */
  TYPE_FLOAT: 2,

  /**
   *
   * @type {number}
   */
  TYPE_DATE: 3,

  /**
   *
   * @type {number}
   */
  TYPE_STRINGLIST: 4,

  /**
   *
   * @type {number}
   */
  TYPE_BOOL: 5,
}
