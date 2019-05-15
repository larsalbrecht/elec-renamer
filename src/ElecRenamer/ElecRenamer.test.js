const fs = require('fs');
const ElecRenamer = require('./ElecRenamer');

jest.mock('fs');

describe('ElecRenamer', () => {
  it('returns new instance of ElecRenamer', () => {
    // eslint-disable-next-line
    const actual = new ElecRenamer();

    expect(actual)
      .toBeInstanceOf(ElecRenamer);
  });

  describe('setFilePathList', () => {
    it('should set new list of file paths', () => {
      const elecRenamer = new ElecRenamer();
      const setFilePathListSpy = jest.spyOn(elecRenamer, 'setFilePathList');

      const filePathList = ['/path/to/a.example', '/path/to/b.example'];
      elecRenamer.setFilePathList(filePathList);

      expect(setFilePathListSpy)
        .toHaveBeenCalledTimes(1);

      expect(setFilePathListSpy)
        .toHaveBeenCalledWith(filePathList);

      expect(elecRenamer.filePathList)
        .toBe(filePathList);
    });
  });

  describe('setInputPattern', () => {
    it('should set new input pattern', () => {
      const elecRenamer = new ElecRenamer();
      const setInputPatternSpy = jest.spyOn(elecRenamer, 'setInputPattern');
      const inputPattern = '';

      elecRenamer.setInputPattern(inputPattern);

      expect(setInputPatternSpy)
        .toHaveBeenCalledTimes(1);

      expect(setInputPatternSpy)
        .toHaveBeenCalledWith(inputPattern);

      expect(elecRenamer.inputPattern)
        .toBe(inputPattern);
    });
  });

  describe('getFilePathList', () => {
    it('should return the current file path list', () => {
      const elecRenamer = new ElecRenamer();
      const filePathList = ['/path/to/a.example', '/path/to/b.example'];
      elecRenamer.filePathList = filePathList;

      const actual = elecRenamer.getFilePathList();

      expect(actual)
        .toBe(filePathList);
    });
  });

  describe('getPreviewFilePathList', () => {
    it('should return file path list', () => {
      const elecRenamer = new ElecRenamer();
      const setFilePathListSpy = jest.spyOn(elecRenamer, 'getPreviewFilePathList');

      const actual = elecRenamer.getPreviewFilePathList();

      expect(actual)
        .toBe(elecRenamer.filePathListPreview);

      expect(setFilePathListSpy)
        .toHaveBeenCalledTimes(1);
    });
  });

  describe('generateFileListPreview', () => {
    it('should call replacer.getReplacement with any file path and input pattern and index in array', async () => {
      const elecRenamer = new ElecRenamer();

      const getReplacementSpy = jest.spyOn(elecRenamer.replacer, 'getReplacement');

      const filePathList = ['/path/to/a.example', '/path/to/b.example'];
      elecRenamer.setFilePathList(filePathList);
      await elecRenamer.generateFileListPreview();

      expect(getReplacementSpy)
        .toHaveBeenCalledTimes(filePathList.length);

      filePathList.forEach((filePath, index) => {
        expect(getReplacementSpy)
          .toHaveBeenCalledWith(elecRenamer.inputPattern, filePath, index);
      });
    });
  });

  describe('renameFiles', () => {
    it('should rename the files with the preview files and set the new paths as list', async () => {
      const elecRenamer = new ElecRenamer();

      const filePathList = ['path/to/a.example', 'path/to/b.example'];
      const filePathListPreview = ['a.example.renamed', 'b.example.renamed'];
      const expectedFilePathList = ['path/to/a.example.renamed', 'path/to/b.example.renamed'];

      elecRenamer.filePathList = filePathList;
      elecRenamer.filePathListPreview = filePathListPreview;

      fs.rename.mockReturnValue(null);
      const fsRenameSpy = jest.spyOn(fs, 'rename');

      await elecRenamer.renameFiles();

      expect(fsRenameSpy)
        .toHaveBeenCalledTimes(2);

      let i = 0;
      filePathList.forEach((filePath) => {
        expect(fsRenameSpy)
          .toHaveBeenCalledWith(filePath, expectedFilePathList[i], expect.anything());
        i += 1;
      });

      expect(elecRenamer.filePathList)
        .toEqual(expectedFilePathList);
    });
  });
});
