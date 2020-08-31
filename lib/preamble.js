import mitt from 'mitt';

let inside = mitt();
let outside = mitt();

self.addEventListener = outside.on;
self.removeEventListener = outside.off;
self.dispatchEvent = outside.emit;
outside.on('message', e => {
  if (self.onmessage) self.onmessage(e);
});
self.postMessage = data => {
  inside.emit('message', { data });
};
self.terminate = () => {
  throw Error('Not Supported');
};
