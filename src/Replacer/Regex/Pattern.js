class Pattern {
  /**
   *
   * @param text {String}
   * @returns {String}
   */
  static quote(text) {
    if (typeof text === 'string') {
      return text.replace(/[\\\-.*+?^${}()|[\]]/g, '\\$&');
    }
    return '';
  }
}

module.exports = Pattern;
