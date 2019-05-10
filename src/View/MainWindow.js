const { BrowserWindow } = require('electron');
const { ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');

const Replacer = require('../Replacer')();

class MainWindow extends BrowserWindow {
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

    this.inputPattern = '[n]';
    this.filesPathList = [];
    this.previewFileList = [];

    this.once('ready-to-show', () => {
      this.show();
    });

    ipcMain.on('set-input-pattern', async (event, inputPattern) => {
      if (this.inputPattern === inputPattern) {
        return;
      }

      this.inputPattern = inputPattern;
      await this.generatePreview();
      this.sendPreviewFiles();
    });

    ipcMain.on('rename', async () => {
      this.filesPathList = await this.filesPathList.map((filePath, index) => {
        const basePath = path.dirname(filePath);
        const newFullyFilePath = path.join(basePath, this.previewFileList[index]);
        fs.rename(filePath, newFullyFilePath, (err) => {
          if (err) console.error(err);
        });

        return newFullyFilePath;
      });

      // TODO update files in ui after resending new items
      this.sendFiles();
    });

    ipcMain.on('set-files', async (event, filePathList) => {
      this.filesPathList = filePathList;
      await this.generatePreview();
      this.sendPreviewFiles();
    });

    this.loadFile('src/View/MainWindow.html')
      .catch((error) => { console.log(error); });
  }

  async generatePreview() {
    const filePathListPreviewPromises = this.filesPathList.map((filePath, index) => Replacer.getReplacement(this.inputPattern, filePath, index)
      .catch((error) => {
        console.error('Error while replacing for preview', error);
      }));

    this.previewFileList = await Promise.all(filePathListPreviewPromises);
  }

  sendFiles() {
    this.webContents.send('files', this.filesPathList);
  }

  sendPreviewFiles() {
    this.webContents.send('files-for-preview', this.previewFileList);
  }
}

module.exports = MainWindow;
