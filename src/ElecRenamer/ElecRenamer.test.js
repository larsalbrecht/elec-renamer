const fs = require('fs').promises;
const path = require('path');
const ElecRenamer = require('./ElecRenamer');

afterEach(() => {
  jest.clearAllMocks();
});


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

  describe('setReplaceList', () => {
    it('should set new list of texts', () => {
      const elecRenamer = new ElecRenamer();
      const setReplaceListSpy = jest.spyOn(elecRenamer, 'setReplaceList');

      const replaceList = ['A', 'B'];
      elecRenamer.setReplaceList(replaceList);

      expect(setReplaceListSpy)
        .toHaveBeenCalledTimes(1);

      expect(setReplaceListSpy)
        .toHaveBeenCalledWith(replaceList);

      expect(elecRenamer.replaceList)
        .toBe(replaceList);
    });
  });

  describe('addFilePathList', () => {
    it('should add new list of file paths', () => {
      const elecRenamer = new ElecRenamer();

      const filePathListA = ['/path/to/a.example', '/path/to/b.example'];
      const filePathListB = ['/path/to/a2.example', '/path/to/b2.example'];
      elecRenamer.addFilePathList(filePathListA);
      elecRenamer.addFilePathList(filePathListB);

      expect(elecRenamer.filePathList)
        .toEqual([...filePathListA, ...filePathListB]);
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
      elecRenamer.setFilePathList(filePathList);

      const actual = elecRenamer.getFilePathList();

      expect(actual)
        .toEqual(filePathList);
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

  describe('getInputPattern', () => {
    it('should return input pattern', () => {
      const elecRenamer = new ElecRenamer();
      const setFilePathListSpy = jest.spyOn(elecRenamer, 'getInputPattern');

      const actual = elecRenamer.getInputPattern();

      expect(actual)
        .toBe(elecRenamer.inputPattern);

      expect(setFilePathListSpy)
        .toHaveBeenCalledTimes(1);
    });
  });

  describe('getReplaceList', () => {
    it('should return replaceList', () => {
      const elecRenamer = new ElecRenamer();
      const replaceList = ['A', 'B', 'C'];
      elecRenamer.replaceList = replaceList;

      expect(elecRenamer.getReplaceList())
        .toEqual(replaceList);
    });
  });

  describe('generateFilePathList', () => {
    it('should filter file path list by file extension and set result to generatedFilePathList', () => {
      const elecRenamer = new ElecRenamer();

      const filePathList = ['/path/to/a.example', '/path/to/b.example', '/path/to/b.non-example'];
      const expectedFilePathList = ['/path/to/a.example', '/path/to/b.example'];
      elecRenamer.filePathList = filePathList;
      elecRenamer.generateFilePathList();

      expect(elecRenamer.generatedFilePathList)
        .toEqual(filePathList);

      elecRenamer.setFileExtensionFilter('example');
      elecRenamer.generateFilePathList();

      expect(elecRenamer.generatedFilePathList)
        .toEqual(expectedFilePathList);
    });
  });

  describe('generateFileListPreview', () => {
    it('should throw error if input pattern is not type string', async () => {
      const elecRenamer = new ElecRenamer();

      const filePathList = ['/path/to/a.example', '/path/to/b.example'];
      elecRenamer.setFilePathList(filePathList);

      elecRenamer.setInputPattern(undefined);

      await expect(elecRenamer.generateFileListPreview())
        .rejects
        .toThrow('Input Pattern must be set to type String!');
    });

    it('should throw error if getReplacement throws error', async () => {
      const elecRenamer = new ElecRenamer();

      const filePathList = ['/path/to/a.example', '/path/to/b.example'];
      elecRenamer.setFilePathList(filePathList);
      elecRenamer.replacer.inputReplacerList = [{
        getReplacement: jest.fn(() => Promise.reject()),
      }];

      await expect(elecRenamer.generateFileListPreview())
        .rejects
        .toThrow(/Error while replacing for preview: /);
    });

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

    it('should return preview of data in promise', async () => {
      const elecRenamer = new ElecRenamer();

      const filePathList = ['/path/to/a.example', '/path/to/b.example'];
      elecRenamer.setFilePathList(filePathList);
      const actual = await elecRenamer.generateFileListPreview();

      expect(actual)
        .toEqual(filePathList.map(filePath => path.basename(filePath)));
    });

    it('should return preview of data with replaced items when replaceList is set', async () => {
      const elecRenamer = new ElecRenamer();
      const replaceList = ['A', 'B'];

      elecRenamer.inputPattern = '[t, $list$]';
      elecRenamer.filePathList = ['path/to/a.example', 'path/to/b.example'];
      elecRenamer.setReplaceList(replaceList);
      const actual = await elecRenamer.generateFileListPreview();

      expect(actual)
        .toEqual(replaceList);
    });

    it('should return preview of data with one replaced items when replaceList is set', async () => {
      const elecRenamer = new ElecRenamer();
      const replaceList = ['A'];

      elecRenamer.setInputPattern('[t, $list$]');
      elecRenamer.setFilePathList(['path/to/a.example', 'path/to/b.example']);
      elecRenamer.setReplaceList(replaceList);
      elecRenamer.generateFilePathList();

      const actual = await elecRenamer.generateFileListPreview();

      expect(actual[0])
        .toEqual(replaceList[0]);

      expect(actual[1])
        .toEqual(path.basename(elecRenamer.filePathList[1]));
    });
  });

  describe('renameFiles', () => {
    it('should call generateFileListPreview with no preview generated', async () => {
      const elecRenamer = new ElecRenamer();
      elecRenamer.filePathList = ['path/to/a.example', 'path/to/b.example'];

      fs.rename = jest.fn(() => Promise.resolve());
      const generateFileListPreviewSpy = jest.spyOn(elecRenamer, 'generateFileListPreview');

      await elecRenamer.renameFiles();

      expect(generateFileListPreviewSpy)
        .toHaveBeenCalledTimes(1);
    });

    it('should rename the files with the preview files and set the new paths as list', async () => {
      const elecRenamer = new ElecRenamer();

      const filePathList = ['path/to/a.example', 'path/to/b.example'];
      const filePathListPreview = ['a.example.renamed', 'b.example.renamed'];
      const expectedFilePathList = ['path/to/a.example.renamed', 'path/to/b.example.renamed'];

      elecRenamer.filePathList = filePathList;
      elecRenamer.filePathListPreview = filePathListPreview;

      await elecRenamer.generateFilePathList();

      fs.rename = jest.fn(() => Promise.resolve());
      const fsRenameSpy = jest.spyOn(fs, 'rename');

      await elecRenamer.renameFiles();

      expect(fsRenameSpy)
        .toHaveBeenCalledTimes(2);

      let i = 0;
      await filePathList.forEach((filePath) => {
        expect(fsRenameSpy)
          .toHaveBeenCalledWith(filePath, expectedFilePathList[i]);
        i += 1;
      });

      expect(elecRenamer.filePathList)
        .toEqual(expectedFilePathList);
    });

    // TODO bring this test to run!
    it.skip('should throw error when fs.rename will throw error', async () => {
      const elecRenamer = new ElecRenamer();
      elecRenamer.filePathList = ['path/to/a.example', 'path/to/b.example'];
      elecRenamer.filePathListPreview = ['a.example.renamed', 'b.example.renamed'];
      fs.rename = jest.fn(() => Promise.reject(new Error('Error')));

      await expect(elecRenamer.renameFiles())
        .rejects
        .toThrow(/Error while renaming files: Error/);
    });
  });

  describe('clear', () => {
    it('should set filePathList to empty list', () => {
      const elecRenamer = new ElecRenamer();
      elecRenamer.filePathList = ['', '', ''];

      elecRenamer.clear();

      expect(elecRenamer.filePathList)
        .toEqual([]);
    });

    it('should set inputPattern to default one', () => {
      const elecRenamer = new ElecRenamer();
      elecRenamer.inputPattern = '';

      elecRenamer.clear();

      expect(elecRenamer.inputPattern)
        .toBe(elecRenamer.defaultInputPattern);
    });

    it('should set filePathListPreview to null', () => {
      const elecRenamer = new ElecRenamer();
      elecRenamer.filePathListPreview = [''];

      elecRenamer.clear();

      expect(elecRenamer.filePathListPreview)
        .toBeNull();
    });
  });

  describe('addInputReplacer', () => {
    it('should add an inputReplacer from data to replacer', () => {
      const addInputReplacerData = {
        before: 'before',
        notBefore: true,
        search: 'search',
        after: 'after',
        notAfter: true,
        replace: 'replace',
        replaceAll: true,
      };
      const elecRenamer = new ElecRenamer();

      elecRenamer.addInputReplacer(addInputReplacerData);

      expect(elecRenamer.replacer.inputReplacerList[0])
        .toEqual(addInputReplacerData);
    });
  });

  describe('updateInputReplacer', () => {
    it('should set an inputReplacer from data to replacer', () => {
      const addInputReplacerDataBefore = {
        before: 'before',
        notBefore: true,
        search: 'search',
        after: 'after',
        notAfter: true,
        replace: 'replace',
        replaceAll: true,
      };

      const addInputReplacerDataAfter = {
        before: 'BEFORE',
        notBefore: false,
        search: 'SEARCH',
        after: 'AFTER',
        notAfter: false,
        replace: 'REPLACE',
        replaceAll: false,
      };


      const elecRenamer = new ElecRenamer();

      elecRenamer.addInputReplacer(addInputReplacerDataBefore);

      expect(elecRenamer.replacer.inputReplacerList[0])
        .toEqual(addInputReplacerDataBefore);

      elecRenamer.updateInputReplacer(0, addInputReplacerDataAfter);

      expect(elecRenamer.replacer.inputReplacerList[0])
        .toEqual(addInputReplacerDataAfter);
    });
  });

  describe('removeInputReplacer', () => {
    it('should remove an inputReplacer from data of replacer', () => {
      const addInputReplacerData = {
        before: 'before',
        notBefore: true,
        search: 'search',
        after: 'after',
        notAfter: true,
        replace: 'replace',
        replaceAll: true,
      };

      const elecRenamer = new ElecRenamer();

      elecRenamer.addInputReplacer(addInputReplacerData);

      expect(elecRenamer.replacer.inputReplacerList[0])
        .toEqual(addInputReplacerData);

      elecRenamer.removeInputReplacer(0);

      expect(elecRenamer.replacer.inputReplacerList)
        .toHaveLength(0);
    });
  });
});
