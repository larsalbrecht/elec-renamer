import Component from '../libs/Component.js';
import RenamerService from '../Services/RenamerService.js';

const path = require('path');

class FilePathPreviewTable extends Component {
  constructor() {
    super({
      element: document.getElementById('file-preview'),
    });

    this.filePathsPreview = [];

    RenamerService.on('set-preview-file-path-list', (event, filePathPreviewList) => {
      this.filePathsPreview = filePathPreviewList;
      this.render();
    });
  }

  render() {
    if (this.filePathsPreview === null || this.filePathsPreview.length === 0) {
      this.element.querySelector('tbody').innerHTML = '<tr><td>No items</td></tr>';

      return;
    }
    const tableRows = this.filePathsPreview.map(file => `<tr><td><input readonly value="${path.basename(file)}"/></td></tr>`);
    this.element.querySelector('tbody').innerHTML = tableRows.join('');
  }
}

export default FilePathPreviewTable;
