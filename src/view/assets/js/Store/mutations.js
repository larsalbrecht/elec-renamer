/* eslint-disable no-param-reassign */
export default {
  setFilePaths(state, payload) {
    return { filePaths: payload };
  },
  setFilePathsPreview(state, payload) {
    return { filePathsPreview: payload };
  },
  addFilePaths(state, payload) {
    state.filePaths.push(payload);

    return state;
  },
  // other stuff (TODO must be removed before commit!)
  addItem(state, payload) {
    state.items.push(payload);

    return state;
  },
  clearItem(state, payload) {
    state.items.splice(payload.index, 1);

    return state;
  },
};
