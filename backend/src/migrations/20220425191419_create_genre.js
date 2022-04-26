
exports.up = function(knex) {
	return Promise.all([
		knex.schema.createTable('genre', function (table) {

			table.increments(); // Integer id
			table.string('name').checkIn(['action', 'comedy', 'drama', 'fantasy', 'horror', 'mystery', 'romance', 'thriller']).notNullable();  
			table.string('description', 300);

			table.timestamps();
		})
	]);
};

exports.down = function(knex) {
	return Promise.all([
		knex.schema.dropTableIfExists("genre")
	]);
};
