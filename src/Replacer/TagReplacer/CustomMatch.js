class CustomMatch {
  /**
   *
   * @param matches {String[]}
   */
  constructor(matches) {
    this.matches = matches;
  }

  /**
   *
   * @param index {Number}
   */
  group(index) {
    return (this.matches[index] !== null && this.matches[index] !== undefined ? this.matches[index] : null);
  }
}

module.exports = CustomMatch;
