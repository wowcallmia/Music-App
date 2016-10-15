const express = require('express');
const router = express.Router();

import Thing from '../models/Thing';

router.route('/')
  .get((req, res) =>{
    Thing.find({}, (err, things) =>{
      res.status(err ? 400: 200).send(err || things);
    })
  })

module.exports = router;
