const {BrowserWindow} = require('electron')
const {ipcMain} = require('electron')

const Replacer = require('../Replacer')()

class ReplacerHandler {

  constructor () {
    this.inputPattern = '[n]'
    this.files = []
    this.previewFiles = []
  }

  /**
   *
   * @param files {Array<String>}
   */
  setFiles (files) {
    this.files = [...this.files, ...files]
  }

  /**
   *
   * @param inputPattern {String}
   */
  setInputPattern (inputPattern) {
    this.inputPattern = inputPattern
  }

  async generatePreviewFiles () {
    const filePathListPreviewPromises = this.files.map((filePath, index) => {
      return Replacer.getReplacement(this.inputPattern, filePath, index)
    })

    this.previewFiles = await Promise.all(filePathListPreviewPromises)
  }

}

class MainWindow extends BrowserWindow {

  // #files = []

  constructor () {
    super({width: 800, height: 600, show: false, title: 'ElecRenamer'})
    this.webContents.openDevTools()

    this.inputPattern = '[n]'
    this.files = []
    this.previewFiles = []

    this.once('ready-to-show', () => {
      this.show()
    })

    ipcMain.on('set-input-pattern', async (event, inputPattern) => {
      if (this.inputPattern === inputPattern) {
        return
      }

      this.inputPattern = inputPattern
      await this.generatePreview()
      this.sendPreviewFiles()
    })

    ipcMain.on('rename', (event, arg) => {
    })

    ipcMain.on('set-files', async (event, filePathList) => {
      this.files = filePathList
      await this.generatePreview()
      this.sendPreviewFiles()
    })

    this.loadFile('src/View/MainWindow.html')
  }

  async generatePreview () {
    const filePathListPreviewPromises = this.files.map((filePath, index) => {
      return Replacer.getReplacement(this.inputPattern, filePath, index)
    })

    this.previewFiles = await Promise.all(filePathListPreviewPromises)
  }

  sendPreviewFiles () {
    this.webContents.send('files-for-preview', this.previewFiles)
  }

  sendFilePathPreview (filePathList) {
    const filePathListPreviewPromises = filePathList.map((filePath, index) => {
      return Replacer.getReplacement(this.inputPattern, filePath, index)
    })
  }

  /*
  -> Dateien werden hinzugefügt
  -> Dateien werden für den preview vorbereitet
  -> Preview-Dateien werden gesendet

   */

}

module.exports = MainWindow
