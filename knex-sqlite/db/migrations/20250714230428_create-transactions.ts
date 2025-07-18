import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('transactions', (table) => {
    table.uuid('id').primary();
    table.text('title').notNullable();
    table.enu('type', ['credit', 'debit']).notNullable();
    table.decimal('amount', 10, 2).notNullable();
    table.timestamp('created_At').defaultTo(knex.fn.now()).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('transactions');
}
