import Component from '../libs/Component.js';
import store from '../Store/index.js';

const path = require('path');

class FilePathTable extends Component {
  constructor() {
    super({
      store,
      element: document.getElementById('file-list'),
    });
  }

  render() {
    if (store.state.filePaths.length === 0) {
      this.element.querySelector('tbody').innerHTML = '<tr><td>No items</td></tr>';

      return;
    }
    const tableRows = store.state.filePaths.map(file => `<tr><td><input readonly value="${path.basename(file)}"/></td></tr>`);
    this.element.querySelector('tbody').innerHTML = tableRows.join('');
  }
}

export default FilePathTable;
