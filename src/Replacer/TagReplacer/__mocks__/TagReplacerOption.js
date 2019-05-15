const TagReplacerOption = {
  getType: jest.fn(() => Promise.resolve('')),
  getModifier: jest.fn(() => new Map([['case-sensitive', false], ['list', 'A|B|C']])),
  has: jest.fn(() => null),
};

module.exports = TagReplacerOption;
