import Component from '../libs/Component.js';
import RenamerService from '../Services/RenamerService.js';

class ClearButton extends Component {
  constructor() {
    super({
      element: document.getElementById('clear-button'),
    });

    this.element.addEventListener('click', () => {
      RenamerService.clear();
    });
  }

  render() {}
}

export default ClearButton;
