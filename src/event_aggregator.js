class EventAggregator {
  constructor() {
    this.subscribed = {};
  }

  subscribe(event, callback) {
    if (!this.subscribed[event]) {
      this.subscribed[event] = [];
    }

    this.subscribed[event].push(callback);
  }

  publish(event, data) {
    (this.subscribed[event] || []).forEach((callback) => {
      callback(data);
    });
  }
}

export default new EventAggregator();
