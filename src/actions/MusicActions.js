import API from '../API';
import AppDispatcher from '../AppDispatcher';
import * as types from '../actions/ActionTypes';

const MusicActions = {
  searchMusic: API.searchMusic,
  searchSpecific: API.searchSpecific,
  getTrackFeatures: API.getTrackFeatures,
  getVideoId: API.getVideoId,
  clearStore () {
    AppDispatcher.dispatch({
      type: types.CLEAR_STORE,
      payload: { types }
    });
  }

}

export default MusicActions;
