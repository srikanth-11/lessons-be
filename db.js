const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('./knexfile')[environment];
const knex = require('knex')(knexConfig);
const { Model } = require('objection');

Model.knex(knex);

module.exports = knex;