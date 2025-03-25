import { pgTable, serial, text, varchar , numeric  } from 'drizzle-orm/pg-core';

export const userSchema = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 50 }).notNull().unique(),
  email: varchar('email', { length: 100 }).notNull().unique(),
  password: text('password').notNull(),  // Hashed password
});

export const productSchema = pgTable('products', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  price: numeric('price').notNull(), // Decimal numbers
});