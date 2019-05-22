const KnexConnection = require('../../db/knex');
const { Model } = require('objection');

Model.knex(KnexConnection);

class exchangeRateModel extends Model {
    
    static get tableName () {
        return 'exchange_rate';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [],
            properties: {
                id: {type: 'integer'},
                iso: {type: 'string'},
                amount: {type: 'string'},
                rate: {type: 'string'},
                difference: {type: 'string'},
            }
        };
    }
    
}

module.exports = exchangeRateModel;