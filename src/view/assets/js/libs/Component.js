class Component {
  constructor(props = {}) {
    this.render = this.render || (() => {});

    if (Object.prototype.hasOwnProperty.call(props, 'element')) {
      this.element = props.element;
    }
  }
}

export default Component;
