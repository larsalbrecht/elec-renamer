import Ipc from '../libs/Ipc.js';

const ipc = new Ipc();

export default {
  rename(context) {
    ipc.send('rename');
  },
  clear(context) {
    context.commit('setInputPattern', '[n]');
  },
  setInputPattern(context, payload) {
    ipc.send('set-input-pattern', payload);
  },
  addFilePaths(context, payload) {
    ipc.send('add-file-path-list', payload);
  },
  setFilePaths(context, payload) {
    context.commit('setFilePaths', payload);
  },
  setFilePathsPreview(context, payload) {
    context.commit('setFilePathsPreview', payload);
  },
  addInputReplacer(context, payload) {
    context.commit('addInputReplacer', payload);
  },
  removeInputReplacer(context, payload) {
    context.commit('removeInputReplacer', payload);
  },
  updateInputReplacerItem(context, payload) {
    context.commit('updateInputReplacerItem', payload);
  },
};
