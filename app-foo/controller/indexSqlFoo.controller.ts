import { Context } from "../deps-managed.ts";
import { getSqliteDb } from "../../config/sqlite/dbclient.ts";



// deno-lint-ignore require-await
export async function indexSqlFooController(ctx: Context) { 
  // db client
  const db = getSqliteDb()
  // get tasks
  const tasks = [];
  for (const [id, text] of db.query("SELECT  id , text FROM todo_tasks ")) {
    tasks.push(
      {
        id,
        text,
      },
    );
  }
  db.close();
  ctx.response.body = tasks;
}
