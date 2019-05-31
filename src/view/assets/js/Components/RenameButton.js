import Component from '../libs/Component.js';
import RenamerService from '../Services/RenamerService.js';

class ClearButton extends Component {
  constructor() {
    super({
      element: document.getElementById('rename-button'),
    });

    this.element.addEventListener('click', () => {
      RenamerService.rename();
    });
  }

  render() {

  }
}

export default ClearButton;
