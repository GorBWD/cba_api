const { CronJob } = require('cron');
const updateCurrencies = require('./jobs/upadteCurrencies');

updateCurrencies();

new CronJob('0 0 0 * * *', updateCurrencies, null, true);