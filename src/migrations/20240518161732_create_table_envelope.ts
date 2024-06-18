import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('envelops', (table) => {
        table.increments('id');
        table.string('name', 100).notNullable();
        table.text('description').nullable();
        table.string('user').notNullable();
        table.timestamps(true, true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('envelops');
}

