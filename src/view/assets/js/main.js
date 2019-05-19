import InputPatternInput from './Components/InputPatternInput.js';
import ClearButton from './Components/ClearButton.js';
import RenameButton from './Components/RenameButton.js';
import FilePathTable from './Components/FilePathTable.js';
import FilePathPreviewTable from './Components/FilePathPreviewTable.js';

import store from './Store/index.js';
import dnd from './libs/drag-n-drop.js';
import Ipc from './libs/Ipc.js';

const ipc = new Ipc();

ipc.on('set-preview-file-path-list', (event, data) => {
  store.dispatch('setFilePathsPreview', data);
});
ipc.on('set-file-path-list', (event, data) => {
  store.dispatch('setFilePaths', data);
});


dnd.bindTo(document.body, async (e) => {
  e.preventDefault();
  const filePaths = [...e.dataTransfer.files].map(file => file.path);

  store.dispatch('addFilePaths', filePaths);
});


const inputPatternInputInstance = new InputPatternInput();
const clearButtonInstance = new ClearButton();
const renameButtonInstance = new RenameButton();
const filePathTableInstance = new FilePathTable();
const filePathPreviewTableInstance = new FilePathPreviewTable();

inputPatternInputInstance.render();
clearButtonInstance.render();
renameButtonInstance.render();
filePathTableInstance.render();
filePathPreviewTableInstance.render();
