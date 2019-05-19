const { ipcRenderer } = require('electron');

class Ipc {
  constructor() {
    this.ipcRenderer = ipcRenderer;
  }

  send(channel, ...args) {
    this.ipcRenderer.send(channel, ...args);
  }

  sendWithCallback(channel, returnChannel, ...args) {
    return new Promise((resolve) => {
      this.send(channel, ...args);
      this.ipcRenderer.on(returnChannel, (event, result) => {
        resolve(result);
      });
    });
  }

  on(channel, callback) {
    this.ipcRenderer.on(channel, callback);
  }
}

export default Ipc;
