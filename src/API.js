import axios from 'axios';
import ServerActions from './actions/ServerActions';

const API = {
  searchMusic(query, type) {
    axios.get(`/api/spotify/search?q=${encodeURI(query)}&type=${type}`)
      .then(res => res.data)
      .then(data => ServerActions.receiveSearchResults(data, type))
      .catch(console.error)
  },
  searchSpecific(type, id) {
    axios.get(`/api/spotify/specific?id=${id}&type=${type}`)
      .then(res => res.data)
      .then(data => ServerActions.receiveSpecific(data, type))
      .catch(console.error)
  },
  getTrackFeatures(id) {
    axios.get(`/api/spotify/track-features?id=${id}`)
    .then(res => res.data)
    .then(data => ServerActions.receiveTrackFeatures(data))
    .catch(console.error)
  },
  getVideoId(query) {
    axios.get(`/api/youtube/videoId?q=${query}`)
      .then(res => res.data)
      .then(data => ServerActions.receiveVideoId(data))
      .catch(console.error)
  }
}

export default API;
