import { Context, Status } from "../deps-managed.ts";
import { getSqliteDb } from "../../config/sqlite/dbclient.ts";


// deno-lint-ignore require-await
export async function indexController(ctx: Context) {
  // Default variable for minimise if else in code
  let isReady = true;
  // Default variable  details in response when inspect behavur happed
  let details = "";
  // default tasks
  const tasks = [];
  // get data from db
  try {
    const db = getSqliteDb();
    const sql = "SELECT  id , text FROM todo_tasks "
    for (const [id, text] of db.query(sql)) {
      tasks.push(
        {
          id,
          text,
        },
      );
    }
    db.close();
  } catch (_error) {
    isReady = false;
    details = "some errors happen in db connect or sql execution";
  }

  if (isReady) ctx.response.body = tasks;
  else {
    ctx.response.status = Status.InternalServerError;
    ctx.response.body = { details };
  }
}
