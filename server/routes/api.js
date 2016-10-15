const express = require('express');
const router = express.Router();

router.use('/things', require('./things'));
router.use('/spotify', require('./spotify'));

module.exports = router;
