import Component from '../libs/Component.js';
import RenamerService from '../Services/RenamerService.js';

class FileExtensionFilterInput extends Component {
  constructor() {
    super({
      element: document.getElementById('file-extension-filter'),
    });

    this.element.addEventListener('keyup', () => {
      RenamerService.setFileExtensionFilter(this.element.value);
    });

    this.element.value = '';
  }

  render() {}
}

export default FileExtensionFilterInput;
