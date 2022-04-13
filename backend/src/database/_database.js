const pg = require('pg')

const client = new pg.Client({
  host: "myreviewinstance.ceihmk6lcdnm.us-east-1.rds.amazonaws.com",
  database: 'my_review',
  user: 'postgres',
  password: 'myreview123',
  port: 5432, 
})

module.exports = client
