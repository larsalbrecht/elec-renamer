import InputPatternInput from './Components/InputPatternInput';
import ClearButton from './Components/ClearButton';
import RenameButton from './Components/RenameButton';
import FilePathTable from './Components/FilePathTable';
import FilePathPreviewTable from './Components/FilePathPreviewTable';
import InputReplacerList from './Components/InputReplacerList';
import RenamerService from './Services/RenamerService';
import dnd from './libs/drag-n-drop';

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
const inputReplacerListInstance = new InputReplacerList();

inputPatternInputInstance.render();
clearButtonInstance.render();
renameButtonInstance.render();
filePathTableInstance.render();
filePathPreviewTableInstance.render();
inputReplacerListInstance.render();
