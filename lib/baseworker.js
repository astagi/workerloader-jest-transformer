const mitt = require('mitt');

function addWrappedEventListener(target, listeners, name, listener, wrappedListener) {
  listeners[name] = [...(listeners[name] || []), [listener, wrappedListener]];
  target.on(name, wrappedListener);
}

function removeWrappedEventListener(target, listeners, name, listener) {
  let wrappedListeners = listeners[name];
  for (let [i, [l, wrappedListener]] of wrappedListeners.entries()) {
    if (l === listener) {
      wrappedListeners.slice(i, 1);
      target.off(name, wrappedListener);
      break;
    }
  }
}

class BaseWorker {
  constructor () {
    let inside = mitt();
    let insideListeners = [];
    let outside = mitt();
    let closed = false;

    let self = {};

    // Inside
    self.addEventListener = (name, listener) => {
      addWrappedEventListener(inside, insideListeners, name, listener, event => {
        try {
          listener(event);
        }
        catch (error) {
          if (!closed) outside.emit('error', { error });
        }
      });
    };
    self.removeEventListener = (name, listener) => {
      removeWrappedEventListener(inside, insideListeners, name, listener);
    };
    self.dispatchEvent = (e, m) => {
      if (!closed) outside.emit(e, m);
    };
    self.postMessage = data => {
      self.dispatchEvent('message', { data });
    };
    self.close = () => {
      closed = true;
    };

    // Outside
    this.onmessage = null;
    this.onerror = null;
    this.dispatchEvent = (e, m) => {
      if (!closed) inside.emit(e, m);
    };
    this.addEventListener = outside.on;
    this.removeEventListener = outside.off;
    this.postMessage = (data) => {
      this.dispatchEvent('message', { data });
    };
    this.terminate = () => {
      closed = true;
    };

    outside.on('message', e => {
      if (this.onmessage) this.onmessage(e);
    });
    outside.on('error', e => {
      if (this.onerror) this.onerror(e);
    });

    let onmessage = this.main(self, self.addEventListener, self.removeEventListener, self.dispatchEvent, self.postMessage, self.close);

    if (onmessage) {
      inside.on('message', e => {
        try {
          onmessage(e);
        }
        catch (error) {
          if (!closed) outside.emit('error', { error });
        }
      });
    }
  }
}

module.exports = BaseWorker
