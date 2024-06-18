import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('transactions', (table) => {
        table.string('id');
        table.string('type').notNullable();
        table.decimal('amount').notNullable();
        table.text('description').nullable();
        table.string('user').notNullable();
        table.integer('envelopeId').notNullable();
        table.timestamps(true, true, true);
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('transactions');
}

