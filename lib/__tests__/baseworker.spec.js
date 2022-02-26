import BaseWorker from '../baseworker';

function processMessage(e, close) {
  if (!e.data) throw Error();
  if (e.data == 'close and error') {
    close();
    throw Error();
  }
  if (e.data == -1) close();
  return e.data*2;
}

class TestWorker1 extends BaseWorker {
  main(self, addEventListener, removeEventListener, dispatchEvent, postMessage, close) {
    const onmessage = e => {
      postMessage(processMessage(e, close));
    };
    return onmessage;
  }
}

class TestWorker2 extends BaseWorker {
  main(self, addEventListener, removeEventListener, dispatchEvent, postMessage, close) {
    addEventListener('message', e => {
      dispatchEvent('message', { data: processMessage(e, close) });
    });
  }
}

class TestWorker3 extends BaseWorker {
  main(self, addEventListener, removeEventListener, dispatchEvent, postMessage, close) {
    let onmessage = e => {
      throw new Error('should never be called!');
    };
    let onmessage2 = e => {
      postMessage(processMessage(e, close));
    };
    let onmessage3 = e => {
      throw new Error('should never be called!');
    };
    addEventListener('message', onmessage);
    addEventListener('message', onmessage2);
    addEventListener('message', onmessage3);
    removeEventListener('message', onmessage);
    removeEventListener('message', onmessage3);
  }
}

const sleep = t => new Promise( r => { setTimeout(r, t); });


describe('BaseWorker class', () => {
  const defineTests = (TestWorker) => () => {
    it('instantiate a BaseWorker', async() => {
      const worker = new TestWorker();
      worker.onmessage = jest.fn();
      worker.postMessage(5);
      await sleep(10);
      expect(worker.onmessage).toHaveBeenCalledWith({ data: 10 });
    });
    it('instantiate a BaseWorker using event listeners and dispatch', async() => {
      const worker = new TestWorker();
      const onmessage = jest.fn();
      worker.addEventListener('message', onmessage);
      worker.dispatchEvent('message', { data: 5 });
      await sleep(10);
      expect(onmessage).toHaveBeenCalledWith({ data: 10 });
    });
    it('handles errors correctly', async () => {
      const worker = new TestWorker();
      worker.onerror = jest.fn();
      worker.postMessage(undefined);
      await sleep(10);
      expect(worker.onerror).toHaveBeenCalled();
    });
    it('handles errors correctly using event listeners and dispatch', async () => {
      const worker = new TestWorker();
      const onerror = jest.fn();
      worker.addEventListener('error', onerror);
      worker.dispatchEvent('message', {});
      await sleep(10);
      expect(onerror).toHaveBeenCalled();
    });
    it('terminates a worker', async() => {
      const worker = new TestWorker();
      worker.onmessage = jest.fn();
      worker.onerror = jest.fn();
      worker.terminate();
      worker.postMessage(5);
      worker.postMessage(undefined);
      await sleep(10);
      expect(worker.onmessage).not.toHaveBeenCalled();
      expect(worker.onerror).not.toHaveBeenCalled();
    });
    it('closes a worker', async() => {
      const worker = new TestWorker();
      worker.onmessage = jest.fn();
      worker.onerror = jest.fn();
      worker.postMessage(-1);
      worker.postMessage(5);
      worker.postMessage(undefined);
      worker.postMessage('close and error');
      await sleep(10);
      expect(worker.onmessage).not.toHaveBeenCalled();
      expect(worker.onerror).not.toHaveBeenCalled();
    });
    it('closes a worker and throws error', async() => {
      const worker = new TestWorker();
      worker.onmessage = jest.fn();
      worker.onerror = jest.fn();
      worker.postMessage('close and error');
      worker.postMessage(5);
      worker.postMessage(undefined);
      worker.postMessage(-1);
      await sleep(10);
      expect(worker.onmessage).not.toHaveBeenCalled();
      expect(worker.onerror).not.toHaveBeenCalled();
    });
    it('closes a worker using event listeners and dispatch', async() => {
      const worker = new TestWorker();
      const onmessage = jest.fn();
      const onerror = jest.fn();
      worker.addEventListener('message', onmessage);
      worker.addEventListener('error', onerror);
      worker.dispatchEvent('message', { data: -1 });
      worker.dispatchEvent('message', { data: 5 });
      worker.dispatchEvent('message', {});
      worker.dispatchEvent('message', { data: 'close and error' });
      await sleep(10);
      expect(onmessage).not.toHaveBeenCalled();
      expect(onerror).not.toHaveBeenCalled();
    });
    it('closes a worker and throws error using event listeners and dispatch', async() => {
      const worker = new TestWorker();
      const onmessage = jest.fn();
      const onerror = jest.fn();
      worker.addEventListener('message', onmessage);
      worker.addEventListener('error', onerror);
      worker.dispatchEvent('message', { data: 'close and error' });
      worker.dispatchEvent('message', { data: 5 });
      worker.dispatchEvent('message', {});
      worker.dispatchEvent('message', { data: -1 });
      await sleep(10);
      expect(onmessage).not.toHaveBeenCalled();
      expect(onerror).not.toHaveBeenCalled();
    });
  };
  describe('execution with TestWorker1', defineTests(TestWorker1));
  describe('execution with TestWorker2', defineTests(TestWorker2));
  describe('execution with TestWorker3', defineTests(TestWorker3));
});
