const { attachPaginate } = require('knex-paginate');
attachPaginate();

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'my_review',
      host: "myreviewinstance.ceihmk6lcdnm.us-east-1.rds.amazonaws.com",
      user:     'postgres',
      password: 'myreview123',
      port: 5432,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'myreview_staging',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'myreview_production',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
