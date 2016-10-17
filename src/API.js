import axios from 'axios';
import ServerActions from './actions/ServerActions';

const API = {
  searchMusic(query, type) {
    axios.get(`/api/spotify/search?q=${encodeURI(query)}&type=${type}`)
      .then(res => res.data)
      .then(data => ServerActions.receiveSearchResults(data, type))
      .catch(console.error);
  },
  searchSpecific(type, id) {
    axios.get(`/api/spotify/specific?id=${id}&type=${type}`)
      .then(res => res.data)
      .then(data => ServerActions.receiveSpecific(data, type))
      .catch(console.error);
  },
  getAlbums(id) {
    axios.get(`/api/spotify/albums?id=${id}`)
    .then(res => res.data)
    .then(data => ServerActions.receiveAlbums(data))
    .catch(console.error);
  },
  getTrackFeatures(id) {
    axios.get(`/api/spotify/track-features?id=${id}`)
    .then(res => res.data)
    .then(data => ServerActions.receiveTrackFeatures(data))
    .catch(console.error);
  },
  getAlbumTracks(id) {
    axios.get(`/api/spotify/album-tracks?id=${id}`)
    .then(res => res.data)
    .then(data => ServerActions.receiveAlbumTracks(data))
    .catch(console.error);
  },

  getVideoId(query) {
    axios.get(`/api/youtube/videoId?q=${query}`)
      .then(res => {
        return res.data
      })
      .then(data => ServerActions.receiveVideoId(data))
      .catch(console.error)
  }
};

export default API;
