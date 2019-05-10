class TagReplacerOption {

  /**
   *
   * @param type {Number}
   * @param modifier {Map<String, Object>}
   */
  constructor(type, modifier = null) {
    /**
     * {Number}
     */
    this.type = type;

    /**
     * {String, Object}
     */
    this.modifier = modifier;
  }

  /**
   *
   * @returns {Number}
   */
  getType() {
    return this.type;
  }

  /**
   *
   * @returns {Map<String, Object>}
   */
  getModifier() {
    return this.modifier;
  }
}

module.exports = TagReplacerOption;
