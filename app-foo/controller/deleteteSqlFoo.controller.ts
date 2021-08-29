import { Context,Status } from "../deps-managed.ts";
import { getSqliteDb } from "../../config/sqlite/dbclient.ts";


// deno-lint-ignore require-await
export async function deleteteSqlFooController(ctx: Context) {
  // sqlite db clent
  const db = getSqliteDb();
  // extract id
  const pathname = ctx.request.url.pathname;
  const urlData = pathname.split("/");
  const idStr = urlData.at(-1);
  //
  let dbTotalChanges = 0
  if (idStr) {
    const id = parseInt(idStr);
    // run sql query
    db.query("DELETE FROM todo_tasks WHERE id = ? ", [id]);
    console.log("total changes");
    dbTotalChanges = db.totalChanges
  }
  db.close()
  if(dbTotalChanges){
    ctx.response.body = {
      "dbChanges": dbTotalChanges,
    };
  }else{
    ctx.response.status  = Status.NotFound
  } 

}
