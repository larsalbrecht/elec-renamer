import Component from '../libs/Component';
import RenamerService from '../Services/RenamerService';

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
}

export default FileExtensionFilterInput;
