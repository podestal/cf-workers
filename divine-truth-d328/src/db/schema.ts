import { sql } from "drizzle-orm";
import { pgTable, uuid, varchar, integer, timestamp, check } from "drizzle-orm/pg-core";

export const usersTable = pgTable('users', {
    id: uuid().primaryKey().defaultRandom(),
    email: varchar({ length: 255 }).notNull().unique(),
    passwordHash: varchar({ length: 255 }).notNull(),
    age: integer(),
    createdAt: timestamp({ withTimezone: true }).defaultNow(),
    updatedAt: timestamp({ withTimezone: true }).defaultNow(),
}, table => [
    check('age_check1', sql`${table.age} <= 120`),
    check('age_check2', sql`${table.age} >= 0`),
])