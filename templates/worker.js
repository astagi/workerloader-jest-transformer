import BaseWorker from 'workerloader-jest-transformer/lib/baseworker'
/* {% WORKER_IMPORTS %} */

export default class Worker extends BaseWorker {

  main(self, addEventListener, removeEventListener, dispatchEvent, postMessage, terminate) {
    /* {% WORKER_CODE %} */
    return onmessage
  }

}
