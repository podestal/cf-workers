import { type UUID } from "crypto";
import { db } from "./db";
import { todosTable } from "./schema";
import { desc, eq } from "drizzle-orm";

type NewTodo = {
    userId: UUID;
    title: string;
    description?: string;
    completed?: boolean;
}

export const getTodosByUserId = async (userId: UUID) => {
    const todos = await db.select()
    .from(todosTable)
    .where(eq(todosTable.userId, userId))
    .orderBy(desc(todosTable.createdAt))

    return todos
}

export const insertTodo = async (todo: NewTodo) => {
    const [createdTodo] = await db
    .insert(todosTable)
    .values(todo)
    .returning()

    return createdTodo
}