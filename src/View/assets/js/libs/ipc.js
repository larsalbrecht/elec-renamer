const { ipcRenderer } = require('electron');

const DOMReady = (callback) => {
  // eslint-disable-next-line no-unused-expressions
  document.readyState === 'interactive' || document.readyState === 'complete' ? callback() : document.addEventListener('DOMContentLoaded', callback());
};

/**
 * TODO refactor!!
 * Sender / Receiver
 * Single Component for ipc
 * No replacer logic here
 */
ipcRenderer.on('files-for-preview', (event, filePathList) => {
  // TODO move this
  const tableRows = filePathList.map(filePath => `<tr><td><input readonly value="${filePath}"/></td></tr>`);

  document.getElementById('file-preview')
    .querySelector('tbody').innerHTML = tableRows.join('');
});

window.ipc = window.ipc || {};
// eslint-disable-next-line
(function (n) {
  window.ipc.messaging = {
    /**
     *
     * @param filePathList {Array<String>}
     */
    sendFilesEvent(filePathList) {
      ipcRenderer.send('set-files', filePathList);
    },
    sendInputPatternEvent(inputPattern) {
      ipcRenderer.send('set-input-pattern', inputPattern);
    },
    sendRenameEvent() {
      ipcRenderer.send('rename');
    },

    init() {
      document.getElementById('rename-button')
        .addEventListener('click', () => {
          window.ipc.messaging.sendRenameEvent();
        });

      document.getElementById('input-pattern')
        .addEventListener('keyup', (e) => {
          if (this.inputPattern === e.target.value) {
            return;
          }
          this.inputPattern = e.target.value;
          window.ipc.messaging.sendInputPatternEvent(this.inputPattern);
        });
    },

  };

  n(() => {
    window.ipc.messaging.init();
  });
}(DOMReady));

module.exports = window.ipc;
