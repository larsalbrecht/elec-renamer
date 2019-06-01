import Component from '../libs/Component';
import RenamerService from '../Services/RenamerService';

const templateInner = document.createElement('InputReplacerItem');

const dataRow = ''
  + '<div class="column-before"><input type="text"/></div>\n'
  + '<div class="column-not-before"><input type="checkbox"/></div>\n'
  + '<div class="column-search"><input type="text"/></div>\n'
  + '<div class="column-after"><input type="text"/></div>\n'
  + '<div class="column-not-after"><input type="checkbox"/></div>\n'
  + '<div class="column-replace"><input type="text"/></div>\n'
  + '<div class="column-replace-all"><input type="checkbox"/></div>\n'
  + '<div class="column-remove-row"><input type="button" value="-"/></div>\n';


class InputReplacerItem extends Component {
  constructor(inputReplacerList, index, inputReplacer) {
    super({
      element: {},
    });
    this.inputReplacerList = inputReplacerList;
    this.inputReplacer = inputReplacer;
    this.index = index;

    this.templateInner = templateInner.cloneNode();

    this.templateInner.innerHTML = dataRow;

    this.data = {
      before: this.inputReplacer.before || '',
      notBefore: this.inputReplacer.notBefore || false,
      search: this.inputReplacer.search || '',
      after: this.inputReplacer.after || '',
      notAfter: this.inputReplacer.notAfter || false,
      replace: this.inputReplacer.replace || '',
      replaceAll: this.inputReplacer.replaceAll || false,
    };
  }

  render() {
    this.templateInner.querySelector('.column-before input').value = this.data.before || '';
    this.templateInner.querySelector('.column-not-before input').checked = this.data.notBefore || false;
    this.templateInner.querySelector('.column-search input').value = this.data.search || '';
    this.templateInner.querySelector('.column-after input').value = this.data.after || '';
    this.templateInner.querySelector('.column-not-after input').checked = this.data.notAfter || false;
    this.templateInner.querySelector('.column-replace input').value = this.data.replace || '';
    this.templateInner.querySelector('.column-replace-all input').checked = this.data.replaceAll || false;

    this.templateInner.querySelector('.column-remove-row')
      .addEventListener('click', () => {
        this.inputReplacerList.removeItem(this.index);
        RenamerService.removeInputReplacer(this.index);
      });

    [...this.templateInner.querySelectorAll('input')].forEach((input) => {
      const onChange = (event) => {
        // get key from css-classname and swap to camelCase (from kebab-case)
        const key = InputReplacerItem.getKeyFromTarget(event.target);

        let { value } = event.target;

        // if checkbox, use "checked" instead of "value"
        if (event.target instanceof HTMLInputElement && event.target.type === 'checkbox') {
          value = event.target.checked;
        }

        this.data[key] = value;
        this.inputReplacerList.updateItem(this.index, this.data);
        RenamerService.updateInputReplacer(this.index, this.data);
      };

      if (input.type === 'checkbox') {
        input.addEventListener('change', onChange);
      } else {
        input.addEventListener('keyup', onChange);
      }
    });
  }

  /**
   *
   * @param eventTarget {HTMLElement}
   * @returns {string}
   */
  static getKeyFromTarget(eventTarget) {
    return eventTarget
      .parentNode
      .classList
      .item(0)
      .substr(7)
      .replace(/-([a-z])/g, g => g[1].toUpperCase());
  }

  getNodes() {
    return this.templateInner.childNodes;
  }
}

export default InputReplacerItem;
