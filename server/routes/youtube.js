const express = require('express');
const router = express.Router();
const axios = require('axios');

router.route('/videoId')
  .get((req, res) => {
    console.log('res, reqdustin: ', req.query);
    let { q } = req.query;
    console.log('SEARCH FOR THIS QUERY', q)
    console.log('SEARCH FOR THIS QUERY', encodeURI(q))

    axios.get(`https://www.googleapis.com/youtube/v3/search?part=id&q=${encodeURI(q)}&key=AIzaSyAhKj26eI0sx1aqyTErPwecWIrr7f5mKuk`)
      .then(res => {
        return res.data
      })
      .then(data => res.send(data))
      .catch(console.error)
  })

module.exports = router;
