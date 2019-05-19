class PublishSubscribe {
  constructor() {
    this.events = {};
  }

  /**
   *
   * @param event {String}
   * @param callback {Function}
   *
   * @returns {*}
   */
  subscribe(event, callback) {
    if (!Object.prototype.hasOwnProperty.call(this.events, event)) {
      this.events[event] = [];
    }

    return this.events[event].push(callback);
  }

  publish(event, data = {}) {
    if (!Object.prototype.hasOwnProperty.call(this.events, event)) {
      return [];
    }

    return this.events[event].map(callback => callback(data));
  }
}

export default PublishSubscribe;
