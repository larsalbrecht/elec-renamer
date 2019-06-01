const Pattern = require('../Regex/Pattern');

class BaseInputReplacer {
  /**
   *
   * @param search {String}
   * @param replace {String}
   * @param replaceAll {Boolean}
   */
  constructor(search, replace, replaceAll = false) {
    this.search = search || '';
    this.replace = replace || '';
    this.replaceAll = replaceAll;

    this.before = null;
    this.notBefore = null;
    this.after = null;
    this.notAfter = null;
  }

  /**
   * @param data {Object}
   * @returns {BaseInputReplacer}
   */
  static fromData(data) {
    if (!Object.prototype.hasOwnProperty.call(data, 'before')
      || !Object.prototype.hasOwnProperty.call(data, 'notBefore')
      || !Object.prototype.hasOwnProperty.call(data, 'search')
      || !Object.prototype.hasOwnProperty.call(data, 'after')
      || !Object.prototype.hasOwnProperty.call(data, 'notAfter')
      || !Object.prototype.hasOwnProperty.call(data, 'replace')
      || !Object.prototype.hasOwnProperty.call(data, 'replaceAll')) {
      throw new Error('Not all properties exists!');
    }

    const newInputReplacer = new BaseInputReplacer(data.search, data.replace, data.replaceAll);
    newInputReplacer.setBefore(data.before, data.notBefore);
    newInputReplacer.setAfter(data.after, data.notAfter);

    return newInputReplacer;
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
   * @param search {String}
   */
  setSearch(search) {
    this.search = search;
  }

  /**
   *
   * @param replace {String}
   */
  setReplace(replace) {
    this.replace = replace;
  }

  /**
   *
   * @param replaceAll {Boolean}
   */
  setReplaceAll(replaceAll) {
    this.replaceAll = replaceAll;
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
