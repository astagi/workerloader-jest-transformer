import BaseWorker from 'workerloader-jest-transformer/lib/baseworker'
import workerHandler from './handlers'

export default class WebWorker extends BaseWorker {

  main(self, addEventListener, removeEventListener, dispatchEvent, postMessage, close) {
    
    
    workerHandler('data')
    
    return typeof onmessage !== 'undefined' ? onmessage : self.onmessage
  }

}
