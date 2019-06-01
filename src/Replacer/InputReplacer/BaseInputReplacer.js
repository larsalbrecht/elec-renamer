const Pattern = require('../Regex/Pattern');

class BaseInputReplacer {
  /**
   *
   * @param search {String}
   * @param replace {String}
   * @param replaceAll {Boolean}
   */
  constructor(search, replace, replaceAll = false) {
    this.search = search;
    this.replace = replace;
    this.replaceAll = replaceAll;

    this.before = null;
    this.notBefore = null;
    this.after = null;
    this.notAfter = null;
  }

  /**
   *
   * @param before {String}
   * @param not {Boolean}
   */
  setBefore(before, not = false) {
    this.before = before;
    this.notBefore = not;
  }

  /**
   *
   * @param after {String}
   * @param not {Boolean}
   */
  setAfter(after, not = false) {
    this.after = after;
    this.notAfter = not;
  }

  /**
   *
   * @param input {String}
   * @returns {String}
   */
  getReplacement(input) {
    const regExp = new RegExp(this.getRegularExpressionString(), this.replaceAll ? 'g' : '');
    return input.replace(regExp, this.replace);
  }

  /**
   *
   * @returns {string}
   */
  getRegularExpressionString() {
    let regExp = '';

    if (this.before) {
      const quotedBefore = Pattern.quote(this.before);
      if (this.notBefore) {
        regExp += `(?<!${quotedBefore})`;
      } else {
        regExp += `(?<=${quotedBefore})`;
      }
    }

    regExp += `(${Pattern.quote(this.search)})`;

    if (this.after) {
      const quotedAfter = Pattern.quote(this.after);
      if (this.notAfter) {
        regExp += `(?!${quotedAfter})`;
      } else {
        regExp += `(?=${quotedAfter})`;
      }
    }

    return regExp;
  }
}

module.exports = BaseInputReplacer;
