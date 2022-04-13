exports.up = function(knex) {
    return Promise.all([
        knex.schema.createTable('person', function (table) {
            table.increments(); // Integer id
            table.string('full_name').notNullable();
            table.string('nickname', 40).notNullable();
            table.string('url_img');
            table.string('email', 80).notNullable();
            table.enu('gender', ['Male', 'Female']).notNullable();
            table.datetime('birthdate').notNullable();
            table.string('password').notNullable();
            table.string('description');

            table.timestamps();
        })
    ]);
};

exports.down = function(knex) {
    return Promise.all([
     knex.schema.dropTableIfExists("person")
    ]);
};
