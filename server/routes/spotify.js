const express = require('express');
const router = express.Router();
const axios = require('axios');

router.route('/search')
  .get((req, res) =>{
    let { q, type } = req.query;
    axios.get(`http://api.spotify.com/v1/search?q=${encodeURI(q)}&type=${type}`)
      // .then(res => res.data)
      // .then(data => res.send(data))
      .then(response => res.send(response.data))
      .catch(console.error)
  })

router.route('/specific')
  .get((req, res) =>{
    let { id, type } = req.query;
    axios.get(`http://api.spotify.com/v1/${type}s/${id}`)
      .then(res => {
        return res.data
      })
      .then(data => res.send(data))
      .catch(console.error)
  })

router.route('/track-features')
  .get((req, res) =>{
    let { id } = req.query;
    let authToken = 'BQCbzjkaOsTMCM_AJuQL7DLI6KIxzYG52KEgPOM_YOIE9QK2qW69_xBTGuG0cJCmWGVWQiI02qHl_qX_z6pnE8-tZSBeqIBiYQET_kJpdplxtgoIuC0ECh9GvLZsmvj3rbWkTlzV2oE';
    axios.get(`https://api.spotify.com/v1/audio-features/${id}`,
      { headers:{
        Accept: 'application/json',
        Authorization: `Bearer ${authToken}`
      }
    })
  .then(res => {
      console.log('res.data!!!!:', res.data)
      return res.data;
    })
    .then(data => res.send(data))
    .catch(console.error)
    })

module.exports = router;

// ({
//    url: 'https://api.spotify.com/v1/me',
//    headers: {
//        'Authorization': 'Bearer ' + accessToken
//    },
//    success: function(response) {
//        ...
//    }
// });

// axios.get(encodeURI(`https://api.spotify.com/v1/audio-features/1zHlj4dQ8ZAtrayhuDDmkY -H Accept: application/json -H Authorization: Bearer BQCHreraqOC_Srw7ICBoBDYdQSlImsi25rM8Ip4fJxGDC6DEIW8snxWMTj52pyCa65TZ5jeWgu21vFiQTcUjBZpNPOszCJns9eUJ4XWB1KNUsKPKX1zX5HIs4g-55XkDWSxOPNy5fAY`))
