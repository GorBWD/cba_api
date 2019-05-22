const express = require('express');
const router = express.Router();
const apiController = require('../controllers/ApiController');

/*
 @route Get /
*/
router.get('/', apiController.RatesLatest);

/*
 @route Get /rates
*/
router.get('/rates', apiController.getDateRangeRatesByCurrency);

module.exports = router;