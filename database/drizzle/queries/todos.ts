import { todoTable } from "../schema/todos";
import { dbD1 } from "../db";

export function insertTodo(db: ReturnType<typeof dbD1>, text: string) {
  return db.insert(todoTable).values({ text });
}

export function getAllTodos(db: ReturnType<typeof dbD1>) {
  return db.select().from(todoTable).all();
}
