import mitt from 'mitt';


export default class Worker {
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
      throw Error('Not Supported');
    }

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

    /* {% WORKER_CODE %} */

    outside.on('message', e => {
      if (onmessage) onmessage(e);
    });

  }
}
