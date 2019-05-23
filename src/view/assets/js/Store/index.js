import actions from './actions.js';
import mutations from './mutations.js';
import state from './state.js';
import Store from './Store.js';

/**
 *
 * @type {Store}
 */
const store = new Store({
  actions,
  mutations,
  state,
});
export default store;
