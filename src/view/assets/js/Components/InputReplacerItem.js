import Component from '../libs/Component.js';
import store from '../Store/index.js';

const templateInner = document.createElement('InputReplacerItem');

const dataRow = ''
  + '<div class="column-before"><input type="text"/></div>\n'
  + '<div class="column-not-before"><input type="checkbox"/></div>\n'
  + '<div class="column-search"><input type="text"/></div>\n'
  + '<div class="column-until"><input type="text"/></div>\n'
  + '<div class="column-not-until"><input type="checkbox"/></div>\n'
  + '<div class="column-replacewith"><input type="text"/></div>\n'
  + '<div class="column-replaceall"><input type="checkbox"/></div>\n'
  + '<div class="column-remove-row"><input type="button" value="-"/></div>\n';


class InputReplacerItem extends Component {
  constructor(index) {
    super({
      store,
      element: {},
    });
    this.index = index;

    this.templateInner = templateInner.cloneNode();

    this.templateInner.innerHTML = dataRow;

    this.data = {
      before: store.state.inputReplacerList[this.index].before || '',
      notBefore: store.state.inputReplacerList[this.index].notBefore || false,
      search: store.state.inputReplacerList[this.index].search || '',
      until: store.state.inputReplacerList[this.index].until || '',
      notUntil: store.state.inputReplacerList[this.index].notUntil || false,
      replaceWith: store.state.inputReplacerList[this.index].replaceWith || '',
      replaceAll: store.state.inputReplacerList[this.index].replaceAll || false,
    };
  }

  render() {
    this.templateInner.querySelector('.column-before input').value = this.data.before || '';
    this.templateInner.querySelector('.column-not-before input').checked = this.data.notBefore || false;
    this.templateInner.querySelector('.column-search input').value = this.data.search || '';
    this.templateInner.querySelector('.column-until input').value = this.data.until || '';
    this.templateInner.querySelector('.column-not-until input').checked = this.data.notUntil || false;
    this.templateInner.querySelector('.column-replacewith input').value = this.data.replaceWith || '';
    this.templateInner.querySelector('.column-replaceall input').checked = this.data.replaceAll || false;


    [...this.templateInner.querySelectorAll('input')].forEach(input => input.addEventListener('change', (event) => {
      const key = event.target
        .parentNode
        .classList
        .item(0)
        .substr(7);

      this.data[key] = event.target.value;

      store.dispatch('updateInputReplacerItem', {
        index: this.index,
        data: this.data,
      });
    }));

    console.log('Index', this.index);
    console.log('List', store.state.inputReplacerList);
  }

  getNodes() {
    return this.templateInner.childNodes;
  }
}

export default InputReplacerItem;
