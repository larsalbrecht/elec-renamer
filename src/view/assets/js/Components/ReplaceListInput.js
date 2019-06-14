import Component from '../libs/Component';
import RenamerService from '../Services/RenamerService';
import dnd from '../libs/drag-n-drop';

const path = require('path');

class ReplaceListInput extends Component {
  constructor() {
    super({
      element: document.getElementById('replace-list-input'),
    });

    dnd.bindTo(this.element, async (event) => {
      event.preventDefault();

      const filePath = ([...event.dataTransfer.files].shift()).path;
      RenamerService.setFileForInputList(filePath);
    });

    this.listInput = [];

    RenamerService.on('set-replace-list', (event, listInput) => {
      this.listInput = listInput;
      this.render();
    });
  }

  render() {
    if (this.listInput.length === 0) {
      this.element.querySelector('tbody').innerHTML = '<tr><td>No items</td></tr>';

      return;
    }
    const tableRows = this.listInput.map(file => `<tr><td><input readonly value="${path.basename(file)}"/></td></tr>`);
    this.element.querySelector('tbody').innerHTML = tableRows.join('');
  }
}

export default ReplaceListInput;
