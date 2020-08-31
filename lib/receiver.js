export default class Receiver {
  constructor () {
    this.onmessage = null
    this.dispatchEvent = inside.emit
    this.addEventListener = inside.on
    this.removeEventListener = inside.off
    this.postMessage = (data) => {
      outside.emit('message', { data });
    }
    inside.on('message', e => {
      let f = this.onmessage;
      if (f) f.call(scope, e);
    });
  }
}
