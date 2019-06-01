import Component from '../libs/Component';
import RenamerService from '../Services/RenamerService';

const path = require('path');

class FilePathTable extends Component {
  constructor() {
    super({
      element: document.getElementById('file-list'),
    });

    this.filePaths = [];

    RenamerService.on('set-file-path-list', (event, filePathList) => {
      this.filePaths = filePathList;
      this.render();
    });
  }

  render() {
    if (this.filePaths.length === 0) {
      this.element.querySelector('tbody').innerHTML = '<tr><td>No items</td></tr>';

      return;
    }
    const tableRows = this.filePaths.map(file => `<tr><td><input readonly value="${path.basename(file)}"/></td></tr>`);
    this.element.querySelector('tbody').innerHTML = tableRows.join('');
  }
}

export default FilePathTable;
