import Component from '../libs/Component.js';
import store from '../Store/index.js';

const path = require('path');

class FilePathPreviewTable extends Component {
  constructor() {
    super({
      store,
      element: document.getElementById('file-preview'),
    });
  }

  render() {
    if (store.state.filePathsPreview.length === 0) {
      this.element.querySelector('tbody').innerHTML = '<tr><td>No items</td></tr>';

      return;
    }
    const tableRows = store.state.filePathsPreview.map(file => `<tr><td><input readonly value="${path.basename(file)}"/></td></tr>`);
    this.element.querySelector('tbody').innerHTML = tableRows.join('');
  }
}

export default FilePathPreviewTable;
