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

    this.loadFile('src/View/index.html')
      .catch((error) => { console.log(error); });
  }

  init() {
    this.elecRenamer = new ElecRenamer();

    ipcMain.on('set-file-path-list', this.onReceiveFilePathListChanges);
    ipcMain.on('set-input-pattern', this.onReceiveInputPatternChanges);
    // ipcMain.on('rename', this.onDoRename);
  }

  sendPreviewFilePathList() {
    this.webContents.send('set-preview-file-path-list', this.elecRenamer.getPreviewFilePathList());
  }

  sendFileList() {
    this.webContents.send('set-file-path-list', this.elecRenamer.getFilePathList());
  }

  async onReceiveFilePathListChanges(event, newFilePathList) {
    this.elecRenamer.setFilePathList(newFilePathList);
    await this.elecRenamer.generateFileListPreview();
    this.sendPreviewFilePathList();
  }

  async onReceiveInputPatternChanges(event, newInputPattern) {
    this.elecRenamer.setInputPattern(newInputPattern);
    await this.elecRenamer.generateFileListPreview();
    this.sendPreviewFilePathList();
  }

  async onReceiveReplaceAction() {
    await this.elecRenamer.renameFiles();
    this.sendFileList();
  }
}

module.exports = Window;
