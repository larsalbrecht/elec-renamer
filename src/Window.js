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
      .catch((error) => { console.error(error); });
  }

  init() {
    this.elecRenamer = new ElecRenamer();

    ipcMain.on('set-file-path-list', this.onReceiveNewFilePathList.bind(this));
    ipcMain.on('add-file-path-list', this.onReceiveFilePathList.bind(this));
    ipcMain.on('set-input-pattern', this.onReceiveInputPatternChanges.bind(this));
    ipcMain.on('add-input-replacer', this.onReceiveInputReplacer.bind(this));
    ipcMain.on('remove-input-replacer', this.onReceiveRemoveInputReplacer.bind(this));
    ipcMain.on('update-input-replacer', this.onReceiveUpdatedInputReplacer.bind(this));
    ipcMain.on('rename', this.onReceiveReplaceAction.bind(this));
    ipcMain.on('clear', this.onReceiveClearAction.bind(this));
  }

  sendPreviewFilePathList() {
    this.webContents.send('set-preview-file-path-list', this.elecRenamer.getPreviewFilePathList());
  }

  sendFileList() {
    this.webContents.send('set-file-path-list', this.elecRenamer.getFilePathList());
  }

  sendInputPattern() {
    this.webContents.send('set-input-pattern', this.elecRenamer.getInputPattern());
  }

  async onReceiveNewFilePathList(event, additionalFilePathList) {
    console.log('onReceiveNewFilePathList', additionalFilePathList);
    this.elecRenamer.setFilePathList(additionalFilePathList);
    await this.elecRenamer.generateFileListPreview();
    this.sendFileList();
    this.sendPreviewFilePathList();
  }

  async onReceiveFilePathList(event, newFilePathList) {
    console.log('onReceiveFilePathList', newFilePathList);
    this.elecRenamer.addFilePathList(newFilePathList);
    await this.elecRenamer.generateFileListPreview();
    this.sendFileList();
    this.sendPreviewFilePathList();
  }

  async onReceiveInputPatternChanges(event, newInputPattern) {
    console.log('onReceiveInputPatternChanges', newInputPattern);
    this.elecRenamer.setInputPattern(newInputPattern);
    await this.elecRenamer.generateFileListPreview();
    this.sendPreviewFilePathList();
  }

  async onReceiveInputReplacer(event, newInputReplacer) {
    console.log('onReceiveInputReplacer', newInputReplacer);
    this.elecRenamer.addInputReplacer(newInputReplacer);
    await this.elecRenamer.generateFileListPreview();
    this.sendPreviewFilePathList();
  }

  async onReceiveRemoveInputReplacer(event, index) {
    console.log('onReceiveRemoveInputReplacer', index);
    this.elecRenamer.removeInputReplacer(index);
    await this.elecRenamer.generateFileListPreview();
    this.sendPreviewFilePathList();
  }

  async onReceiveUpdatedInputReplacer(event, updatedInputReplacer) {
    console.log('onReceiveUpdatedInputReplacer', updatedInputReplacer);
    this.elecRenamer.updateInputReplacer(updatedInputReplacer.index, updatedInputReplacer.inputReplacer);
    await this.elecRenamer.generateFileListPreview();
    this.sendPreviewFilePathList();
  }

  async onReceiveReplaceAction() {
    console.log('onReceiveReplaceAction');
    await this.elecRenamer.renameFiles()
      .catch((error) => {
        console.error(error);
      });
    this.sendInputPattern();
    this.sendPreviewFilePathList();
    this.sendFileList();
  }

  async onReceiveClearAction() {
    console.log('onReceiveClearAction');
    this.elecRenamer.clear();

    this.sendInputPattern();
    this.sendPreviewFilePathList();
    this.sendFileList();
  }
}

module.exports = Window;
