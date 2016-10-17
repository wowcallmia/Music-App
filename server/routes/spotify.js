const express = require('express');
const router = express.Router();
const axios = require('axios');

router.route('/search')
  .get((req, res) =>{
    let { q, type } = req.query;
    axios.get(`http://api.spotify.com/v1/search?q=${encodeURI(q)}&type=${type}`)
      .then(response => res.send(response.data))
      .catch(console.error)
  })

router.route('/specific')
  .get((req, res) => {
    let { id, type } = req.query;
    axios.get(`http://api.spotify.com/v1/${type}s/${id}`)
      .then(res => res.data)
      .then(data => res.send(data))
      .catch(console.error)
  })

router.route('/track-features')
  .get((req, res) =>{
    let { id } = req.query;
    let authToken = 'BQBGXH2nVYeR7UBt8OrG_ON9A8MdcI397hv0f4MHzjmwplUB7aE3gSjOSEQTYxYsUOwgM19uZ-AMi_aLQrZcTsx6hYl4e1Lu_rq55glJjj2BsXDNKbqk0bUJVkTmQdZk5ZIYQ2s7YfWhLetijPOYYW-z2JsRLuH131H4LeeF2bgn4V9KGvDnEp_4lmnHpdM70fp-zi_YWVaBvvMreLaZLXj4dEOCfxzYSHHcVw-SYyKlPMYraAQaQlP7i2uIlDLWftUH4Eqj1nmGddTbRukHDPk02o6Tpb69c9x2zKbE1fn7ylNsFAo';
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
