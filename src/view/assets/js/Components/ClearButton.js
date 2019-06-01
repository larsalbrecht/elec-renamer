import Component from '../libs/Component';
import RenamerService from '../Services/RenamerService';

class ClearButton extends Component {
  constructor() {
    super({
      element: document.getElementById('clear-button'),
    });

    this.element.addEventListener('click', () => {
      RenamerService.clear();
    });
  }
}

export default ClearButton;
