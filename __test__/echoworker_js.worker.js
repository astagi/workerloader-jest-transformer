
const ctx = self;

ctx.addEventListener('message', (ev) => {
  ctx.postMessage(ev.data);
});

