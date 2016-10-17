const express = require('express');
const router = express.Router();

router.use('/spotify', require('./spotify'));
router.use('/youtube', require('./youtube'));
router.use('/genius', require('./genius'));

module.exports = router;
