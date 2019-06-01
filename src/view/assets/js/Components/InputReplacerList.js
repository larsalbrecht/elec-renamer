import Component from '../libs/Component';
import InputReplacerItem from './InputReplacerItem';
import RenamerService from '../Services/RenamerService';

const template = document.createElement('input-replacer-list');

const headerRow = ''
  + '<div class="column-before header">Before</div>\n'
  + '<div class="column-not-before header">Not</div>\n'
  + '<div class="column-search header">Search</div>\n'
  + '<div class="column-after header">After</div>\n'
  + '<div class="column-not-after header">Not</div>\n'
  + '<div class="column-replace header">Replace With</div>\n'
  + '<div class="column-replace-all header">Replace All</div>\n'
  + '<div class="column-remove-row header">Remove</div>\n';

class InputReplacerList extends Component {
  constructor() {
    super({
      element: document.querySelector('input-replacer-grid'),
    });
    this.inputReplacerList = [];

    this.grid = document.createElement('div');
    this.grid.classList.add('input-replacer-grid');

    this.addButtonElem = document.createElement('input');
    this.addButtonElem.type = 'button';
    this.addButtonElem.value = '+';
    this.addButtonElem.id = 'add-row-button';
    this.addButtonElem.addEventListener('click', () => {
      const newInputReplacer = {
        before: null,
        notBefore: null,
        search: null,
        after: null,
        notAfter: null,
        replace: null,
        replaceAll: null,
      };

      RenamerService.addInputReplacer(newInputReplacer);
      this.inputReplacerList.push(newInputReplacer);
      this.render();
    });

    this.noEntriesElem = document.createElement('p');
    this.noEntriesElem.innerText = '... empty ...';
  }

  render() {
    const newTemplate = template.cloneNode();
    newTemplate.innerHTML = '';

    if (this.inputReplacerList.length === 0) {
      newTemplate.appendChild(this.noEntriesElem);
    } else {
      const rows = this.inputReplacerList.map((inputReplacer, index) => {
        const item = new InputReplacerItem(this, index, inputReplacer);
        item.render();
        return item;
      });

      this.grid.innerHTML = headerRow;

      rows.forEach(row => row.getNodes()
        .forEach(node => this.grid.appendChild(node)));

      newTemplate.appendChild(this.grid);
    }

    newTemplate.appendChild(this.addButtonElem);

    this.element.replaceWith(newTemplate);
    this.element = newTemplate;
  }

  /**
   *
   * @param index {Number}
   * @param data {Object}
   */
  updateItem(index, data) {
    this.inputReplacerList[index] = data;
  }

  /**
   *
   * @param index {Number}
   */
  removeItem(index) {
    this.inputReplacerList.splice(index, 1);
    this.render();
  }
}

export default InputReplacerList;
