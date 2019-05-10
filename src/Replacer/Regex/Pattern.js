class Pattern {
  /**
   *
   * @param text {String}
   * @returns {String}
   */
  static quote(text) {
    return text.replace(/[\\\-.*+?^${}()|[\]]/g, '\\$&');
  }
}

module.exports = Pattern;
