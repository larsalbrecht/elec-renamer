import Component from '../libs/Component';
import RenamerService from '../Services/RenamerService';

class ClearButton extends Component {
  constructor() {
    super({
      element: document.getElementById('rename-button'),
    });

    this.element.addEventListener('click', () => {
      RenamerService.rename();
    });
  }
}

export default ClearButton;
