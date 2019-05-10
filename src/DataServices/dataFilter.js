const path = require('path');

class AbstractFilter {
  doFilter(file) {

  }

  filter(filesList) {
    return filesList.filter(this.doFilter.bind(this));
  }
}

class FileExtensionFilter extends AbstractFilter {
  constructor(extension) {
    super();
    this.extension = extension;
  }

  doFilter(file) {
    return path.extname(file) === this.extension;
  }
}

const dataFilter = {
  fileExtensionFilter: extension => new FileExtensionFilter(extension),
};

module.exports = dataFilter;
