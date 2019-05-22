
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('exchange_rate', table => {
            table.increments('id').primary();
            table.string('iso');
            table.string('amount');
            table.string('rate');
            table.string('difference');
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists("exchange_rate")
    ]);
};
