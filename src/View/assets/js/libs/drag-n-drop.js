module.exports = {
  /**
   * Bind ondrop to an element.
   *
   * @param htmlElement {HTMLElement}
   * @param onDrop {Function}
   */
  bindTo: (htmlElement, onDrop) => {
    const holder = htmlElement

    holder.ondragover = () => false
    holder.ondragleave = () => false
    holder.ondragend = () => false

    holder.ondrop = onDrop
  }
}
