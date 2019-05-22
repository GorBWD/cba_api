const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    IS_PRODUCTION: process.env.NODE_ENV === 'development',
    PORT: process.env.PORT || 3000,
    DB_URL: process.env.DATABASE_URL,
}