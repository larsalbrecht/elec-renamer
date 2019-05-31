const { ipcRenderer } = require('electron');

class Ipc {
  constructor() {
    this.ipcRenderer = ipcRenderer;
  }

  send(channel, ...args) {
    this.ipcRenderer.send(channel, ...args);
  }

  on(channel, callback) {
    this.ipcRenderer.on(channel, callback);
  }
}

export default Ipc;
