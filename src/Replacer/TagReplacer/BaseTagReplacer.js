const Pattern = require('../Regex/Pattern');
const TagReplacerOptions = require('./TagReplacerOptions');

class BaseTagReplacer {
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
    if (this.options !== null && this.options.getOptions() !== null && this.options.getOptions().length > 0) {
      this.options.getOptions()
        .forEach((option) => {
          result += '\\W*(?:,\\W*';
          switch (option.getType()) {
            default:
              break;
            case TagReplacerOptions.TYPE_STRING:
              result += '(.*?)';
              break;
            case TagReplacerOptions.TYPE_INT:
              result += '([0-9]{1,9})';
              break;
            case TagReplacerOptions.TYPE_FLOAT:
              result += '([0-9\\.\\,]+)';
              break;
            case TagReplacerOptions.TYPE_DATE:
              result += '(.+)'; // better regex for this?
              break;
            case TagReplacerOptions.TYPE_BOOL:
              result += '(true|false)';
              break;
            case TagReplacerOptions.TYPE_STRINGLIST:
              result += '(';
              if (/* (Boolean) */ option.getModifier()
                .get('case-sensitive')) {
                // result += '(?i:'
                result += '(?:';
              } else {
                result += '(?:';
              }
              // noinspection unchecked,JSCheckFunctionSignatures
              result += BaseTagReplacer.getQuotedJoinedArray('|', /* (ArrayList < String >) */option.getModifier()
                .get('list'));

              result += '))';
              break;
          }
          if (option.getModifier() !== null) {
            if (option.getModifier()
              .has('required') && option.getModifier()
              .get('required') === true) {
              result += '){1}';
            } else {
              result += ')?';
            }
          } else {
            result += ')?';
          }
        });
    }

    return result;
  }

  /**
   *
   * @param divider {String}
   * @param list {Array}
   * @returns {String}
   */
  static getQuotedJoinedArray(divider, /* ArrayList<String>  */list) {
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

    if (this.options != null && this.options.isHasEndtag()) {
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
    if (this.pattern == null) {
      /* Pattern */
      let result = null;
      try {
        result = new RegExp(this.generatePatternString());
      } catch (error) {
        throw new Error(`Error while generating RegExp: ${error}`);
      }
      this.pattern = result;
    }
    return this.pattern;
  }

  /**
   *
   * @param fileNameMask {String}
   * @param originalFile {String}
   * @param itemPos {int}
   * @returns {*}
   */
  getReplacement(fileNameMask, originalFile, itemPos) {
    const regExp = this.getRegExp();
    if (regExp === null) {
      throw new Error('RegExp is null!');
    }

    let newFileName = fileNameMask;

    let m;

    // eslint-disable-next-line
    while ((m = regExp.exec(newFileName)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regExp.lastIndex) {
        regExp.lastIndex += 1;
      }

      const customMatch = {
        // eslint-disable-next-line
        group: index => ([...m][index] !== null && [...m][index] !== undefined ? [...m][index] : null),
        matches: [...m],
      };

      newFileName = this.replace(regExp, customMatch, newFileName, originalFile, itemPos);
    }

    return newFileName;
  }

  // noinspection JSMethodCanBeStatic
  /**
   * Will be called for each replacement found by pattern.
   *
   * @param pattern {String}
   * @param matcher {String}
   * @param fileNameMask {String}
   * @param originalFile {String}
   * @param itemPos {Number}
   *
   *  @return {String}
   */
  replace(pattern, matcher, fileNameMask, originalFile, itemPos) {
    throw new Error('Must be overriden!');
  }
}

BaseTagReplacer.STRING_START = '[';
BaseTagReplacer.STRING_END = ']';

module.exports = BaseTagReplacer;
