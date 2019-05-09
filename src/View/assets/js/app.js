const ipc = require('./libs/ipc')
const dnd = require('./libs/drag-n-drop')

const DOMReady = function (callback) {
  document.readyState === 'interactive' || document.readyState === 'complete' ? callback() : document.addEventListener('DOMContentLoaded', callback())
}

class App {

  constructor () {
    this.fileList = []
  }

  /**
   *
   * @param fileList {...FileList[]}
   */
  async onFilesAdded (fileList) {
    if (fileList.length === 0) return
    this.fileList = [...this.fileList, ...fileList]

    window.ipc.messaging.sendFilesEvent(this.fileList.map((file) => file.path))
  }

  /**
   * TODO move this to drag and drop and refactor app specific items to here.
   *
   */
  async initFileDragNDrop () {
    const fileSplit = document.getElementById('file-split')
    dnd.bindTo(fileSplit, async (e) => {
      e.preventDefault()

      const fileList = [...e.dataTransfer.files]

      await this.onFilesAdded(fileList)
      const tableRows = this.fileList.map((file) => {
        return `<tr><td><input readonly value="${file.name}"/></td></tr>`
      })

      fileSplit.querySelector('table.file-list tbody').innerHTML = tableRows.join('')

      return false
    })
  }

  initClearButton () {
    const fileSplit = document.getElementById('file-split')
    document.getElementById('clear-button').addEventListener('click', () => {
      this.fileList = []
      fileSplit.querySelector('table.file-list tbody').innerHTML = '<tr><td>No items</td></tr>'
    })
  }
}

(function () {
  const app = new App()
  app.initFileDragNDrop().catch((error) => {console.log(error)})
  app.initClearButton()

})(DOMReady)


