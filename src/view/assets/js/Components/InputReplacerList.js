import Component from '../libs/Component.js';
import store from '../Store/index.js';
import InputReplacerItem from './InputReplacerItem.js';

const template = document.createElement('inputReplacerList');

const headerRow = ''
  + '<div class="column-before header">Before</div>\n'
  + '<div class="column-not-before header">Not</div>\n'
  + '<div class="column-search header">Search</div>\n'
  + '<div class="column-until header">Until</div>\n'
  + '<div class="column-not-until header">Not</div>\n'
  + '<div class="column-replacewith header">Replace With</div>\n'
  + '<div class="column-replaceall header">Replace All</div>\n'
  + '<div class="column-remove-row header">Remove</div>\n';

// const dataRow = ''
//   + '<div class="column-before"><input type="text"/></div>\n'
//   + '<div class="column-not-before"><input type="checkbox"/></div>\n'
//   + '<div class="column-search"><input type="text"/></div>\n'
//   + '<div class="column-until"><input type="text"/></div>\n'
//   + '<div class="column-not-until"><input type="checkbox"/></div>\n'
//   + '<div class="column-replacewith"><input type="text"/></div>\n'
//   + '<div class="column-replaceall"><input type="checkbox"/></div>\n'
//   + '<div class="column-remove-row"><input type="button" value="-"/></div>\n';

class InputReplacerList extends Component {
  constructor() {
    super({
      store,
      element: document.querySelector('input-replacer-grid'),
    });

    this.grid = document.createElement('div');
    this.grid.classList.add('input-replacer-grid');

    this.addButtonElem = document.createElement('input');
    this.addButtonElem.type = 'button';
    this.addButtonElem.value = '+';
    this.addButtonElem.id = 'add-row-button';
    this.addButtonElem.addEventListener('click', () => {
      store.dispatch('addInputReplacer', {
        index: store.state.inputReplacerList.length,
        before: null,
        notBefore: null,
        search: null,
        until: null,
        notUntil: null,
        replaceWith: null,
        replaceAll: null,
      });
    });

    this.noEntriesElem = document.createElement('p');
    this.noEntriesElem.innerText = '... empty ...';
  }

  render() {
    const newTemplate = template.cloneNode();
    newTemplate.innerHTML = '';

    if (store.state.inputReplacerList.length === 0) {
      newTemplate.appendChild(this.noEntriesElem);
    } else {
      const rows = store.state.inputReplacerList.map((inputReplacer, index) => {
        const item = new InputReplacerItem(index);
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
}

export default InputReplacerList;
