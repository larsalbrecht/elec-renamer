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
  addInputReplacer(state, payload) {
    return { inputReplacerList: [...state.inputReplacerList, payload] };
  },
  removeInputReplacer(state, payload) {
    return { inputReplacerList: state.inputReplacerList.filter((elem, index) => index !== payload) };
  },
  updateInputReplacerItem(state, payload) {
    const newInputReplacerListState = state.inputReplacerList.map((item, index) => {
      if (payload.index !== index) {
        return item;
      }
      return payload.data;
    });
    console.log('New List', newInputReplacerListState);
    return { inputReplacerList: newInputReplacerListState };
  },
};
