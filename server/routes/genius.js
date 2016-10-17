const express = require('express');
const router = express.Router();
const axios = require('axios');

router.route('/search')
  .get((req, res) =>{
    let authToken = 'BC5J-yy5r4LqDYTLZ1WNPspwiwUIi9pocWpOvxat7WOlsAFpjcDCHvauiPzE6kSy';
    let { q } = req.query;
    axios.get(`api.genius.com/search?q=${q}`,
      { headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${authToken}`,
        Host: 'api.genius.com',
      }
    })
      .then(res => res.data)
      .then(data => res.send(data))
      .catch(console.error);
  })

  // .get((req, res) =>{
  //   let { id } = req.query;
  //   let authToken = 'BQBGXH2nVYeR7UBt8OrG_ON9A8MdcI397hv0f4MHzjmwplUB7aE3gSjOSEQTYxYsUOwgM19uZ-AMi_aLQrZcTsx6hYl4e1Lu_rq55glJjj2BsXDNKbqk0bUJVkTmQdZk5ZIYQ2s7YfWhLetijPOYYW-z2JsRLuH131H4LeeF2bgn4V9KGvDnEp_4lmnHpdM70fp-zi_YWVaBvvMreLaZLXj4dEOCfxzYSHHcVw-SYyKlPMYraAQaQlP7i2uIlDLWftUH4Eqj1nmGddTbRukHDPk02o6Tpb69c9x2zKbE1fn7ylNsFAo';
  //   axios.get(`https://api.spotify.com/v1/audio-features/${id}`,
  //     { headers:{
  //       Accept: 'application/json',
  //       Authorization: `Bearer ${authToken}`
  //     }
  //   })


module.exports = router;
