const Pattern = require('../Regex/Pattern');
const CustomMatch = require('./CustomMatch');
const TagReplacerOptionKeys = require('./TagReplacerOptionKeys');

class BaseTagReplacer {
  /**
   *
   * @param divider {String}
   * @param list {Array}
   * @returns {String}
   */
  static getQuotedJoinedArray(divider, list) {
    let result = '';
    const itemList = [...list];
    for (let i = 0, iMax = itemList.length; i < iMax; i += 1) {
      if (i > 0) {
        result += divider;
      }
      result += Pattern.quote(itemList[i]);
    }
    return result;
  }

  /**
   *
   * @param shortTag {String}
   * @param longTag {String}
   */
  constructor(shortTag, longTag) {
    this.shortTag = null;
    this.longTag = null;

    /**
     *
     * @type {TagReplacerOptions}
     */
    this.options = null;

    /**
     *
     * @type {RegExp}
     */
    this.pattern = null;


    this.shortTag = shortTag;
    this.longTag = longTag;
  }

  /**
   * Add TagReplacerOptions to renamer.
   *
   * @param options {TagReplacerOptions}
   */
  setOptions(options) {
    this.options = options;
  }

  /**
   * Generates the pattern String for the options (if exists).
   *
   * @return options Pattern String
   */
  generateOptionsPatternString() {
    let result = '';
    if (!(this.options !== null && this.options.getOptions() !== null && this.options.getOptions().length > 0)) {
      return result;
    }
    this.options.getOptions()
      .forEach((option) => {
        result += '\\W*(?:,\\W*';
        // TODO refactor
        switch (option.getType()) {
          default:
            break;
          case TagReplacerOptionKeys.TYPE_STRING:
            result += '(.*?)';
            break;
          case TagReplacerOptionKeys.TYPE_INT:
            result += '([0-9]{1,9})';
            break;
          case TagReplacerOptionKeys.TYPE_FLOAT:
            result += '([0-9]+[\\.\\,]{1}[0-9]+)';
            break;
          case TagReplacerOptionKeys.TYPE_DATE:
            result += '(.+?)'; // better regex for this?
            break;
          case TagReplacerOptionKeys.TYPE_BOOL:
            result += '(true|false)';
            break;
          case TagReplacerOptionKeys.TYPE_STRINGLIST:
            result += '(';
            if (option.getModifier()
              .get('case-sensitive')) {
              // result += '(?i:'
              result += '(?:';
            } else {
              result += '(?:';
            }
            // noinspection unchecked,JSCheckFunctionSignatures
            result += BaseTagReplacer.getQuotedJoinedArray('|', option.getModifier()
              .get('list'));

            result += '))';
            break;
        }
        if (option.getModifier() !== null && option.getModifier()
          .has('required') && option.getModifier()
          .get('required') === true) {
          result += '){1}';
        } else {
          result += ')?';
        }
      });

    return result;
  }

  /**
   * Returns the generated pattern string for the current TagReplacer.
   *
   * @returns {string}
   */
  generatePatternString() {
    const patternStart = `${Pattern.quote(BaseTagReplacer.STRING_START)}\\W*((?:${
      Pattern.quote(this.shortTag)
        .toLocaleLowerCase()}|${
      Pattern.quote(this.shortTag)
        .toLocaleUpperCase()}|${
      Pattern.quote(this.longTag)
        .toLocaleLowerCase()}|${
      Pattern.quote(this.longTag)
        .toLocaleUpperCase()})){1}`;
    const patternEnd = `\\W*${Pattern.quote(BaseTagReplacer.STRING_END)}`;
    const patternOptions = this.generateOptionsPatternString();

    let patternString = patternStart + patternOptions + patternEnd;

    if (this.options != null && this.options.isHasEndTag()) {
      patternString += `${'(.+?)(?:(?:'}${patternStart}${patternEnd})|(?:$))`;
    }

    return patternString;
  }

  /**
   * Returns the pattern.
   * The pattern will be generated ONCE. After generating, the pattern will be reused.
   *
   * @return {RegExp}
   */
  getRegExp() {
    if (this.pattern !== null) {
      return this.pattern;
    }
    try {
      this.pattern = new RegExp(this.generatePatternString());
    } catch (error) {
      throw new Error(`Error while generating RegExp: ${error}`);
    }

    return this.pattern;
  }

  /**
   *
   * @param inputPattern {String}
   * @param inputString {String}
   * @param itemPos {int}
   * @returns {*}
   */
  getReplacement(inputPattern, inputString, itemPos) {
    let regExp = null;

    try {
      regExp = this.getRegExp();
    } catch (e) {
      throw new Error(`RegExp could not be generated: ${regExp}`);
    }

    let newInputPattern = inputPattern;

    /**
     * @type {RegExpExecArray}
     */
    let m;

    // eslint-disable-next-line no-cond-assign
    while ((m = regExp.exec(newInputPattern)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regExp.lastIndex) {
        regExp.lastIndex += 1;
      }
      // noinspection JSValidateTypes
      /**
       *
       * @type {String[]}
       */
      const matchesArr = [...m];
      const customMatch = new CustomMatch(matchesArr);


      newInputPattern = this.replace(regExp, customMatch, newInputPattern, inputString, itemPos);
    }

    return newInputPattern;
  }

  // noinspection JSMethodCanBeStatic
  /**
   * Will be called for each replacement found by pattern.
   *
   * @param pattern {RegExp}
   * @param matcher {CustomMatch}
   * @param inputPattern {String}
   * @param inputString {String}
   * @param itemPos {Number}
   *
   *  @return {String}
   */
  replace(pattern, matcher, inputPattern, inputString, itemPos) {
    throw new Error('Must be overridden!');
  }
}

BaseTagReplacer.STRING_START = '[';
BaseTagReplacer.STRING_END = ']';

module.exports = BaseTagReplacer;
