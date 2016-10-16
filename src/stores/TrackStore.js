import AppDispatcher from '../AppDispatcher';
import { EventEmitter } from 'events';
import * as types from '../actions/ActionTypes';

let _track = undefined;
let _trackType = undefined;
let _features = undefined;

class TrackStore extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(action => {
      let { type, payload } = action;
      switch(type) {
        case(types.RECEIVE_SPECIFIC):
          _track = payload.data;
          _trackType = payload.type;
          this.emit('CHANGE');
          break;
        case(types.RECEIVE_TRACK_FEATURES):
          _features = payload.data;
          this.emit('CHANGE');
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

  getTrack(){
    return _track;
  }

  getTrackType(){
    return _trackType;
  }

  getFeatures(){
    return _features;
  }

}

export default new TrackStore();
