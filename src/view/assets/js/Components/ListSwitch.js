import Component from '../libs/Component';

class ListSwitch extends Component {
  constructor() {
    super({
      element: document.getElementById('list-switch'),
    });

    const { elementsClass } = this.element.dataset;
    const defaultElement = this.element.dataset.defaultElementId;

    this.switchContainerElements = [...document.querySelectorAll(`.${elementsClass}`)];

    this.showElement(defaultElement);

    this.items = this.switchContainerElements.map((element) => {
      const label = document.createElement('label');
      label.textContent = element.dataset.switchTitle;

      const input = document.createElement('input');
      input.type = 'radio';
      input.dataset.id = element.id;
      input.name = 'container-select';

      if (element.id === defaultElement) {
        input.checked = true;
      }

      label.appendChild(input);

      input.addEventListener('change', () => {
        this.showElement(input.dataset.id);
      });

      return label;
    });
  }

  showElement(elementToShow) {
    // hide all but default
    this.switchContainerElements.forEach((element) => {
      if (element.id !== elementToShow) {
        // eslint-disable-next-line
        element.style.display = 'none';
        return;
      }
      // eslint-disable-next-line
      element.style.display = 'block';
    });
  }

  render() {
    this.items.forEach((element) => {
      this.element.appendChild(element);
    });
  }
}

export default ListSwitch;
