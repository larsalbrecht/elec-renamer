import Component from '../libs/Component';
import RenamerService from '../Services/RenamerService';

class InputPatternInput extends Component {
  constructor() {
    super({
      element: document.getElementById('input-pattern'),
    });

    RenamerService.on('set-input-pattern', (event, inputPattern) => {
      this.value = inputPattern;
      this.render();
    });

    this.element.addEventListener('keyup', () => {
      this.value = this.element.value;
      RenamerService.setInputPattern(this.value);
    });

    this.value = '[n]';
  }

  render() {
    this.element.value = this.value;
  }
}

export default InputPatternInput;
