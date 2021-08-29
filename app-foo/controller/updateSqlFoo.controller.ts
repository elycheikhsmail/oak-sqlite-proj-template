import { Context, Status } from "../deps-managed.ts";
import { getSqliteDb } from "../../config/sqlite/dbclient.ts";

export async function updateSqlFooController(ctx: Context) {
  // db client
  const db = getSqliteDb();
  // verify the request body has body
  if (ctx.request.body().type == "json" && ctx.request.hasBody) {
    // extract json data
    const body = ctx.request.body({ type: "json" });
    const values = await body.value;
    const { text } = values;
    // extract id
    const pathname = ctx.request.url.pathname;
    const urlData = pathname.split("/");
    const id = urlData.at(-1);
    // execute sql statement
    db.query("UPDATE todo_tasks SET text=? WHERE id = ? ", [text, id]);
    const dbTotalChanges = db.totalChanges
    db.close()
    if (dbTotalChanges> 0) {
      //
      ctx.response.body = {
        id,
        text,
      };
    } else {
      ctx.response.status = Status.NotFound;
      ctx.response.body = {
        details: "failed",
      };
    }
  } else {
    //
    ctx.response.status = Status.NotFound;
    ctx.response.body = {
      details: "failed",
    };
  }
}
