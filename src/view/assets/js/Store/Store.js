/* eslint-disable no-param-reassign */
import PublishSubscribe from '../libs/PublishSubscribe.js';

class Store {
  constructor(params) {
    this.actions = {};
    this.mutations = {};
    this.state = {};
    this.status = 'resting';
    this.events = new PublishSubscribe();

    if (Object.prototype.hasOwnProperty.call(params, 'actions')) {
      this.actions = params.actions;
    }

    if (Object.prototype.hasOwnProperty.call(params, 'mutations')) {
      this.mutations = params.mutations;
    }

    this.initProxy(params);
  }

  initProxy(params) {
    this.state = new Proxy((params.state || {}), {
      set: (state, key, value) => {
        state[key] = value;

        console.log(`stateChange: ${key}: ${value}`);

        this.events.publish('stateChange', this.state);

        if (this.status !== 'mutation') {
          console.warn(`You should use a mutation to set ${key}`);
        }

        this.status = 'resting';

        return true;
      },
    });
  }

  dispatch(actionKey, payload) {
    if (typeof this.actions[actionKey] !== 'function') {
      console.error(`Action "${actionKey} doesn't exist.`);
      return false;
    }

    console.groupCollapsed(`ACTION: ${actionKey}`);

    this.status = 'action';

    this.actions[actionKey](this, payload);

    console.groupEnd();

    return true;
  }

  commit(mutationKey, payload) {
    if (typeof this.mutations[mutationKey] !== 'function') {
      console.log(`Mutation "${mutationKey}" doesn't exist`);
      return false;
    }

    this.status = 'mutation';

    const newState = this.mutations[mutationKey](this.state, payload);

    this.state = Object.assign(this.state, newState);

    return true;
  }
}

export default Store;
