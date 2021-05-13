
import EchoWorker from './echoworker_js.worker';

describe('EchoWorker', () => {
  it('can execute WebWorker', async () => {
    const worker = new EchoWorker();
    await new Promise((resolve, reject) => {
      worker.addEventListener('message', (ev) => {
        expect(ev.data).toBe('Hello world!');
        resolve();
      });
      worker.postMessage('Hello world!');
    });
  });
});

