
exports.up = function(knex) {
	return Promise.all([
		knex.schema.createTable('badge', function (table) {
			table.increments(); // Integer id
			table.integer('weight').notNullable();  
			table.string('url_img');
			table.string('title', 40).notNullable(); // Add uniq !!!
			table.string('description').notNullable();

			table.timestamps();
		})
	]);
};

exports.down = function(knex) {
  return Promise.all([
		knex.schema.dropTableIfExists("badge")
	 ]);
};
