import axios from 'axios';
import ServerActions from './actions/ServerActions';

const API = {
  searchMusic(query, type) {
    axios.get(`/api/spotify/search?q=${encodeURI(query)}&type=${type}`)
      .then(res => res.data)
      .then(data => ServerActions.receiveSearchResults(data, type))
      .catch(console.error)
  }
}

export default API;
