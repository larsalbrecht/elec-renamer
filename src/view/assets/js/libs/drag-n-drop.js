const dnd = {
  /**
   * Bind ondrop to an element.
   *
   * @param htmlElement {HTMLElement}
   * @param onDrop {Function}
   * @param respectOthers {boolean}
   */
  bindTo: (htmlElement, onDrop, respectOthers = true) => {
    const holder = htmlElement;

    holder.ondragover = () => false;
    holder.ondragleave = () => false;
    holder.ondragend = () => false;

    holder.ondrop = (event) => {
      if (!respectOthers) {
        onDrop(event);
        return;
      }

      let position = null;
      [...event.path].forEach((domElement, index) => {
        if (position !== null) return;

        // noinspection JSIncompatibleTypesComparison
        if (domElement === htmlElement) {
          position = index;
        }
      });
      const path = [...event.path].slice(0, position);
      const hasDropInPath = path.filter(domElement => domElement.ondrop !== undefined && domElement.ondrop !== null).length > 0;
      if (!hasDropInPath) {
        onDrop(event);
      }
    };
  },
};

export default dnd;
