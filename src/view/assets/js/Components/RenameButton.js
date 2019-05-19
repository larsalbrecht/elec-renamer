import Component from '../libs/Component.js';
import store from '../Store/index.js';

class ClearButton extends Component {
  constructor() {
    super({
      store,
      element: document.getElementById('rename-button'),
    });

    this.element.addEventListener('click', () => {
      store.dispatch('rename');
    });
  }

  render() {

  }
}

export default ClearButton;
