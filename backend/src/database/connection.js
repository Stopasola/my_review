const knex = require('knex');
const configuration = require('/home/fernando/projects/myreview/backend/src/knexfile.js');

const connection = knex(configuration.development);

module.exports = connection;  
