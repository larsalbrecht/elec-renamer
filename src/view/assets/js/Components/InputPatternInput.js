import Component from '../libs/Component.js';
import store from '../Store/index.js';

class InputPatternInput extends Component {
  constructor() {
    super({
      store,
      element: document.getElementById('input-pattern'),
    });

    this.element.addEventListener('keyup', () => {
      store.dispatch('setInputPattern', this.element.value);
    });

    this.element.value = '[n]';
  }

  render() {}
}

export default InputPatternInput;
