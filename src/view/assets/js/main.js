import InputPatternInput from './Components/InputPatternInput.js';
import ClearButton from './Components/ClearButton.js';
import RenameButton from './Components/RenameButton.js';
import FilePathTable from './Components/FilePathTable.js';
import FilePathPreviewTable from './Components/FilePathPreviewTable.js';
// import InputReplacerList from './Components/InputReplacerList.js';
import RenamerService from './Services/RenamerService.js';
import dnd from './libs/drag-n-drop.js';

dnd.bindTo(document.body, async (e) => {
  e.preventDefault();
  const filePaths = [...e.dataTransfer.files].map(file => file.path);

  RenamerService.addFilePathList(filePaths);
});

const inputPatternInputInstance = new InputPatternInput();
const clearButtonInstance = new ClearButton();
const renameButtonInstance = new RenameButton();
const filePathTableInstance = new FilePathTable();
const filePathPreviewTableInstance = new FilePathPreviewTable();
// const inputReplacerListInstance = new InputReplacerList();

inputPatternInputInstance.render();
clearButtonInstance.render();
renameButtonInstance.render();
filePathTableInstance.render();
filePathPreviewTableInstance.render();
// inputReplacerListInstance.render();
