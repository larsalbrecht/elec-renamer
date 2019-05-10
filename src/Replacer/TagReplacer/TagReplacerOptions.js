class TagReplacerOptions {
  constructor(hasEndTag = false) {
    /**
     *
     * @type {TagReplacerOption[]}
     */
    this.options = [];

    /**
     *
     * @type {boolean}
     */
    this.hasEndTag = hasEndTag;
  }

  /**
   *
   * @param option {TagReplacerOption}
   * @returns {TagReplacerOptions}
   */
  addOption(option) {
    this.options.push(option);

    return this;
  }

  isHasEndTag() {
    return this.hasEndTag;
  }

  /**
   *
   * @returns {TagReplacerOption[]}
   */
  getOptions() {
    return this.options;
  }
}

module.exports = TagReplacerOptions;
