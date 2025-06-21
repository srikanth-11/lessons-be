/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
   return knex.schema.createTable('lessons', (table) => {
    table.increments('id').primary();
    table.integer('class_id').notNullable(); // ideally foreign key, adjust if needed
    table.string('title').notNullable();
    table.text('description');
    table.string('video_url').notNullable();
    table.boolean('is_published').defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('lessons');
};
