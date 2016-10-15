import AppDispatcher from '../AppDispatcher';
import * as types from './ActionTypes';

const ServerActions = {
  receiveSearchResults(results, type) {
    AppDispatcher.dispatch({
      type: types.RECEIVE_SEARCH_RESULTS,
      payload: { results, type }
    });
  },
  receiveSpecific(data, type) {
    console.log('SERVERACTIONS');
    AppDispatcher.dispatch({
      type: types.RECEIVE_SPECIFIC,
      payload: { data, type }
    });
  }
}

export default ServerActions;
