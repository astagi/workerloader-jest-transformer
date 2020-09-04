const mitt = require('mitt');


class Worker {
  constructor () {

    let inside = mitt();
    let outside = mitt();

    let addEventListener = outside.on;
    let removeEventListener = outside.off;
    let dispatchEvent = outside.emit;
    let postMessage = data => {
      inside.emit('message', { data });
    };
    let terminate = () => {
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

    let onmessage = this.main(addEventListener, removeEventListener, dispatchEvent, postMessage, terminate)
    outside.on('message', e => {
      if (onmessage) onmessage(e);
    });
  }
}

module.exports = Worker
