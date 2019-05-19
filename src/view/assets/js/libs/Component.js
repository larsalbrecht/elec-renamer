import Store from '../Store/Store.js';

class Component {
  constructor(props = {}) {
    this.render = this.render || (() => {});

    if (props.store instanceof Store) {
      props.store.events.subscribe('stateChange', () => this.render());
    }

    if (Object.prototype.hasOwnProperty.call(props, 'element')) {
      this.element = props.element;
    }
  }
}

export default Component;
