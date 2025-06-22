
require('dotenv').config();
module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',         
      password: process.env.DB_PASS,
      database: 'lessons',
    },
    migrations: {
      directory: './migrations',
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DB_URL,
    ssl: {
      rejectUnauthorized: false,
    },
    migrations: {
      directory: './migrations',
    },
  },
};