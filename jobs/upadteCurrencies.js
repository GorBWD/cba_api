const xml2js = require("xml2js");
const soapRequest = require('easy-soap-request');
const exchangeRateModel = require('../api/models/exchangeRateModel');

module.exports = async () => {
    const url = 'http://api.cba.am/exchangerates.asmx?op=ExchangeRatesByDate';
    const headers = {
        'Content-Type': 'text/xml;charset=UTF-8'
    };
    const xml = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
    <ExchangeRatesLatest xmlns="http://www.cba.am/" />
    </soap:Body>
    </soap:Envelope>`;

    try {
        const { response } = await soapRequest(url, headers, xml, 1000);
        const { body } = response;
        

        xml2js.parseString(body, async (err, result) => {
            const data = result['soap:Envelope']['soap:Body'][0].ExchangeRatesLatestResponse[0].ExchangeRatesLatestResult[0].Rates[0].ExchangeRate;

            const insertData = data.map(item => ({
                iso: item.ISO[0],
                amount: item.Amount[0],
                rate: item.Rate[0],
                difference: item.Difference[0],
            }));

            await exchangeRateModel.query().delete();

            await exchangeRateModel.query().insert(insertData);
        });
        process.stdout.write('Process completed successfully');
    } catch (error) {
        process.stdout.write(error);
    }

}