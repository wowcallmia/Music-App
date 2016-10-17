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
    AppDispatcher.dispatch({
      type: types.RECEIVE_SPECIFIC,
      payload: { data, type }
    });
  },
  receiveAlbums(data) {
    AppDispatcher.dispatch({
      type: types.RECEIVE_ALBUMS,
      payload: { data }
    });
  },
  receiveAlbumTracks(data) {
    AppDispatcher.dispatch({
      type: types.RECEIVE_ALBUM_TRACKS,
      payload: { data }
    });
  },
  receiveTrackFeatures(data) {
    AppDispatcher.dispatch({
      type: types.RECEIVE_TRACK_FEATURES,
      payload: { data }
    });
  },
  receiveVideoId(id) {
    AppDispatcher.dispatch({
      type: types.RECEIVE_VIDEO_ID,
      payload: { id }
    });
  }
}

export default ServerActions;
