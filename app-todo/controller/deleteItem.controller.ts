import { Context, Status } from "../deps-managed.ts";
import { getSqliteDb } from "../../config/sqlite/dbclient.ts";

// deno-lint-ignore require-await
export async function deleteItemController(ctx: Context) {
  // Default variable for minimise if else in code
  let isReady = true;
  // Default variable  details in response when inspect behavur happed
  let details = "";
  let dbTotalChanges = 0;

  // extract id
  const pathname = ctx.request.url.pathname;
  const urlData = pathname.split("/");
  const idStr = String(urlData.at(-1));
  const id = parseInt(idStr); 

  // run sql
  try {
    const db = getSqliteDb();
    const sql = "DELETE FROM todo_tasks WHERE id = ? ";
    const args = [id];
    db.query(sql, args);
    console.log("total changes");
    dbTotalChanges = db.totalChanges;
    db.close();
  } catch (_error) {
    console.log(_error);
    isReady = false;
    details = "db connexion or sql execution failed";
  }

  if (dbTotalChanges == 0 ) {
    isReady = false;
    details = " o deleted item, item does't exist";
  } 

  if (isReady) {
    ctx.response.status = Status.NoContent ;
  } else {
    ctx.response.status = Status.NotFound;
    ctx.response.body = { details };
  }
}
