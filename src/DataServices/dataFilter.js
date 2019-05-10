class AbstractFilter {

  constructor() {

  }

  doFilter = (file) => {};

  filter(filesList, arg) {
    return filesList.filter(this.doFilter);
  }
}

class FileExtensionFilter extends AbstractFilter {

  constructor(extension) {
    super();
    this.extension = extension;
  }

  doFilter = (file) => {
    return require('path')
      .extname(file) === this.extension;
  };
}

const dataFilter = {
  fileExtensionFilter: (extension) => new FileExtensionFilter(extension)
};

module.exports = dataFilter;
