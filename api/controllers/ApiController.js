const exchangeRateModel = require('../models/exchangeRateModel');
const http = require('http');

const RatesLatest = async function (req, res) {
    const currencies = await exchangeRateModel
        .query();

    res.render('index', { iso: currencies });
}

const getDateRangeRatesByCurrency = async function (req, res) {
    const { start, end, codes } = req.query;

    http.get(`http://api.cba.am/ExchangeRatesToCSV.ashx?DateFrom=${start}&DateTo=${end}&ISOCodes=${codes}`, (response) => {
        let body = '';
        response.on('data', function (chunk) {
            body += chunk;
        });

        response.on('end', function () {
            const list = body.split('\r\n').slice(1, -1);
            const rates = list.map(item => item.split(',').slice(0, -1));

            res.json(rates);
        });
    });
}

module.exports = {
    RatesLatest,
    getDateRangeRatesByCurrency
};