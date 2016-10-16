const express = require('express');
const router = express.Router();
const axios = require('axios');

router.route('/search')
  .get((req, res) =>{
    let { q, type } = req.query;
    axios.get(`http://api.spotify.com/v1/search?q=${encodeURI(q)}&type=${type}`)
      .then(res => res.data)
      .then(data => res.send(data))
      .catch(console.error)
  })

router.route('/specific')
  .get((req, res) =>{
    let { id, type } = req.query;
    axios.get(`http://api.spotify.com/v1/${type}s/${id}`)
      .then(res => {
        console.log('res.data:', res.data)
        return res.data
      })
      .then(data => res.send(data))
      .catch(console.error)
  })

router.route('/track-features')
  .get((req, res) =>{
    let { id } = req.query;
    axios.get(`http://api.spotify.com/v1/audio-features/${id}`)
      .then(res => {
        console.log('res.data:', res.data)
        return res.data
      })
      .then(data => res.send(data))
      .catch(console.error)
  })

module.exports = router;
