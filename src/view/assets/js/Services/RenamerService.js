import Ipc from '../libs/Ipc';

const ipc = new Ipc();

class RenamerService {
  /**
   *
   * @param filePaths {Array<String>}
   */
  static addFilePathList(filePaths) {
    ipc.send('add-file-path-list', filePaths);
  }

  /**
   *
   * @param inputPattern {String}
   */
  static setInputPattern(inputPattern) {
    ipc.send('set-input-pattern', inputPattern);
  }

  /**
   *
   * @param fileExtensionFilter {String}
   */
  static setFileExtensionFilter(fileExtensionFilter) {
    ipc.send('set-file-extension-filter', fileExtensionFilter);
  }

  /**
   *
   * @param inputReplacer
   */
  static addInputReplacer(inputReplacer) {
    ipc.send('add-input-replacer', inputReplacer);
  }

  static rename() {
    ipc.send('rename');
  }

  static clear() {
    ipc.send('clear');
  }

  static on(name, func) {
    ipc.on(name, func);
  }

  static updateInputReplacer(index, updatedInputReplacer) {
    ipc.send('update-input-replacer', {
      index,
      inputReplacer: updatedInputReplacer,
    });
  }

  static removeInputReplacer(index) {
    ipc.send('remove-input-replacer', index);
  }
}

export default RenamerService;
