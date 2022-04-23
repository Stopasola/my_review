
exports.up = function(knex) {
	return Promise.all([
		knex.schema.createTable('film', function (table) {

			table.increments(); // Integer id
			
			table.string('full_name').notNullable();
			table.integer('rotten_tomatoes_score').defaultTo(0); //.checkBetween([0, 100]);
			table.float('imdb_score').defaultTo(0); //.checkBetween([0.0, 10.0]);
			table.decimal('budget', 10, 2);
			table.string('trailer_url');
			table.string('poster_url');
			table.integer('age_group');
			table.string('synopsis', 300);
			table.integer('runtime'); // minutes
			table.datetime('release_date')
			table.string('language');
			table.string('country');

			table.timestamps();
		})
	]);
};

exports.down = function(knex) {
    return Promise.all([
		knex.schema.dropTableIfExists("film")
	]);
};
