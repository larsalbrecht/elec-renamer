import Component from '../libs/Component.js';
import store from '../Store/index.js';

class ClearButton extends Component {
  constructor() {
    super({
      store,
      element: document.getElementById('clear-button'),
    });

    this.element.addEventListener('click', () => {
      store.dispatch('clear');
      console.log('clear');
    });
  }

  render() {

  }
}

export default ClearButton;
