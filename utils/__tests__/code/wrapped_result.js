import BaseWorker from 'workerloader-jest-transformer/lib/baseworker'
import workerHandler from './handlers'

export default class Worker extends BaseWorker {

  main(addEventListener, removeEventListener, dispatchEvent, postMessage, terminate) {
    
    
    workerHandler('data')
    
    return onmessage
  }

}
