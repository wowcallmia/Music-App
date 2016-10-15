import AppDispatcher from '../AppDispatcher';
import { EventEmitter } from 'events';

let _things = undefined;

class ThingStore extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(action => {
      let { type, payload } = action;
      switch(type) {
        case('CASE_NAME'):
          break;
      }
    })
  }

  startListening(cb) {
    this.on('CHANGE', cb);
  }

  stopListening(cb) {
    this.removeListener('CHANGE', cb);
  }

  getAllThings() {
    return _things;
  }

}

export default new ThingStore();
