const mitt = require('mitt');


class BaseWorker {
  constructor () {

    let inside = mitt();
    let outside = mitt();

    let self = {}

    self.addEventListener = outside.on;
    self.removeEventListener = outside.off;
    self.dispatchEvent = outside.emit;
    self.postMessage = data => {
      inside.emit('message', { data });
    };
    self.terminate = () => {
      console.log('Warning: this method is not supported yet');
    }

    this.onmessage = null
    this.dispatchEvent = inside.emit
    this.addEventListener = inside.on
    this.removeEventListener = inside.off
    this.postMessage = (data) => {
      outside.emit('message', { data });
    }
    inside.on('message', e => {
      if (this.onmessage) this.onmessage(e);
    });

    let onmessage = this.main(self, self.addEventListener, self.removeEventListener, self.dispatchEvent, self.postMessage, self.terminate)
    outside.on('message', e => {
      if (onmessage) onmessage(e);
    });
  }
}

module.exports = BaseWorker
