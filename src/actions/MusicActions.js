import API from '../API';
import AppDispatcher from '../AppDispatcher';

const MusicActions = {
  searchMusic: API.searchMusic,
  searchSpecific: API.searchSpecific,
  getTrackFeatures: API.getTrackFeatures,
}

export default MusicActions;
