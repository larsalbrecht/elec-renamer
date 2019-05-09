class Pattern {

  /**
   *
   * @param text {String}
   * @returns {String}
   */
  static quote (text) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
  }

}

module.exports = Pattern
