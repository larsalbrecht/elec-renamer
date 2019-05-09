const {ipcRenderer} = require('electron')

const DOMReady = function (callback) {
  document.readyState === 'interactive' || document.readyState === 'complete' ? callback() : document.addEventListener('DOMContentLoaded', callback())
}

/**
 * TODO refactor!!
 * Sender / Receiver
 * Single Component for ipc
 * No replacer logic here
 */
ipcRenderer.on('files-for-preview', (event, filePathList) => {
  // TODO move this
  const tableRows = filePathList.map((filePath) => {
    return `<tr><td><input readonly value="${filePath}"/></td></tr>`
  })

  document.getElementById('file-preview').querySelector('tbody').innerHTML = tableRows.join('')
})

window.ipc = window.ipc || {},
  function (n) {
    ipc.messaging = {
      /**
       *
       * @param filePathList {Array<String>}
       */
      sendFilesEvent: function (filePathList) {
        ipcRenderer.send('set-files', filePathList)
      },
      sendInputPatternEvent: function (inputPattern) {
        ipcRenderer.send('set-input-pattern', inputPattern)
      },
      sendRenameEvent: function () {
        ipcRenderer.send('rename')
      },

      init: function () {
        document.getElementById('rename-button').addEventListener('click', () => {
          ipc.messaging.sendRenameEvent()
        })

        document.getElementById('input-pattern').addEventListener('keyup', (e) => {
          if (this.inputPattern === e.target.value) {
            return
          }
          this.inputPattern = e.target.value
          ipc.messaging.sendInputPatternEvent(this.inputPattern)
        })
      }

    }

    n(function () {
      ipc.messaging.init()
    })
  }(DOMReady)

module.exports = window.ipc
