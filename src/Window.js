const { BrowserWindow } = require('electron');
const { ipcMain } = require('electron');
const ElecRenamer = require('./ElecRenamer');

class Window extends BrowserWindow {
  constructor() {
    super({
      width: 800,
      height: 600,
      show: false,
      title: 'ElecRenamer',
      webPreferences: {
        nodeIntegration: true,
        webviewTag: true,
      },
    });
    this.webContents.openDevTools();

    this.once('ready-to-show', () => {
      this.show();
    });

    this.init();
    /**
     *
     * ReceiveFileChanges:
     *  setFiles
     *  generatePreview
     *  sendPreviewData
     *
     * ReceiveInputChanges:
     *  generatePreview
     *  sendPreviewData
     *
     * ReceiveReplaceAction:
     *  renameFilesWithPreviewData
     *  sendFiles
     *
     * ReceiveClearAction:
     *  setFiles
     *  generatePreview
     *  sendPreviewData
     *
     */

    this.loadFile('src/view/index.html')
      .catch((error) => { console.log(error); });
  }

  init() {
    this.elecRenamer = new ElecRenamer();

    ipcMain.on('set-file-path-list', this.onReceiveNewFilePathList.bind(this));
    ipcMain.on('add-file-path-list', this.onReceiveFilePathList.bind(this));
    ipcMain.on('set-input-pattern', this.onReceiveInputPatternChanges.bind(this));
    ipcMain.on('rename', this.onReceiveReplaceAction.bind(this));
    // ipcMain.on('clear', this.onReceiveClearAction.bind(this));
  }

  sendPreviewFilePathList() {
    this.webContents.send('set-preview-file-path-list', this.elecRenamer.getPreviewFilePathList());
  }

  sendFileList() {
    this.webContents.send('set-file-path-list', this.elecRenamer.getFilePathList());
  }

  async onReceiveNewFilePathList(event, additionalFilePathList) {
    this.elecRenamer.setFilePathList(additionalFilePathList);
    await this.elecRenamer.generateFileListPreview();
    this.sendFileList();
    this.sendPreviewFilePathList();
  }

  async onReceiveFilePathList(event, newFilePathList) {
    this.elecRenamer.addFilePathList(newFilePathList);
    await this.elecRenamer.generateFileListPreview();
    this.sendFileList();
    this.sendPreviewFilePathList();
  }

  async onReceiveInputPatternChanges(event, newInputPattern) {
    this.elecRenamer.setInputPattern(newInputPattern);
    await this.elecRenamer.generateFileListPreview();
    this.sendPreviewFilePathList();
  }

  async onReceiveReplaceAction(event) {
    await this.elecRenamer.renameFiles()
      .catch((error) => {
        console.error(error);
      });
    this.sendFileList();
  }
}

module.exports = Window;