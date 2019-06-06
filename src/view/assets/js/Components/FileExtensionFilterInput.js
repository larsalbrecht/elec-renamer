import Component from '../libs/Component';
import RenamerService from '../Services/RenamerService';

class FileExtensionFilterInput extends Component {
  constructor() {
    super({
      element: document.getElementById('file-extension-filter'),
    });

    this.element.addEventListener('keyup', () => {
      this.value = this.element.value;
      RenamerService.setFileExtensionFilter(this.value);
    });

    this.value = '';
  }

  render() {
    this.element.value = this.value;
  }
}

export default FileExtensionFilterInput;
