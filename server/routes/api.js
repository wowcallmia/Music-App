const express = require('express');
const router = express.Router();

router.use('/things', require('./things'));
router.use('/spotify', require('./spotify'));
router.use('/youtube', require('./youtube'));

module.exports = router;
