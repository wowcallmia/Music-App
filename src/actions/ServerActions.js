import AppDispatcher from '../AppDispatcher';
import * as types from './ActionTypes';

const ServerActions = {
  receiveSearchResults(results, type) {
    console.log('INSIDE SERVER ACTIONS');
    AppDispatcher.dispatch({
      type: types.RECEIVE_SEARCH_RESULTS,
      payload: { results, type }
    });
  }
}

export default ServerActions;
