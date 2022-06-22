import BaseWorker from 'workerloader-jest-transformer/lib/baseworker'
import workerHandler from './handlers'

export default class WebWorker extends BaseWorker {

  main(self: any, addEventListener: any, removeEventListener: any, dispatchEvent: any, postMessage: any, close: any) {
    
    
    workerHandler('data')
    
    return typeof onmessage !== 'undefined' ? onmessage : self.onmessage
  }

}
