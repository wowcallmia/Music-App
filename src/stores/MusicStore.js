import AppDispatcher from '../AppDispatcher';
import { EventEmitter } from 'events';
import * as types from '../actions/ActionTypes';

let _searchResults = undefined;
let _searchResultsType = undefined;
let _specific = undefined;

class MusicStore extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(action => {
      let { type, payload } = action;
      switch(type) {
        case(types.RECEIVE_SEARCH_RESULTS):
          _searchResults = payload.results[`${payload.type}s`].items;
          _searchResultsType = payload.type;
          this.emit('CHANGE');
          break;
        case(types.RECEIVE_SPECIFIC):
          _specific = payload.data;
          console.log('_specific:', _specific)
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

  getAllSearchResults() {
    return _searchResults;
  }
  getResultsType(){
    return _searchResultsType;
  }
  getSpecific(){
    return _specific;
  }

}

export default new MusicStore();
