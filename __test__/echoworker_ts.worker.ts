
const ctx: Worker = self as any;

ctx.addEventListener('message', (ev) => {
  ctx.postMessage(ev.data);
});

