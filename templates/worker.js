import BaseWorker from 'workerloader-jest-transformer/lib/baseworker'
/* {% WORKER_IMPORTS %} */

export default class WebWorker extends BaseWorker {

  main(self, addEventListener, removeEventListener, dispatchEvent, postMessage, close) {
    /* {% WORKER_CODE %} */
    return typeof onmessage !== 'undefined' ? onmessage : self.onmessage
  }

}
