const express = require('express');
const {handleGenerateNewShortUrl,handleGetAnalytics} = require('../controllers/url');


const router = express.Router();
router.post('/',handleGenerateNewShortUrl)
router.get('/analytics/:shortId',handleGetAnalytics)

console.log('Analytics handler:', handleGetAnalytics);

module.exports = router;