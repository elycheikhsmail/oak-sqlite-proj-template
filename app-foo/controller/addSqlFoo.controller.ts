import { Context, Status } from "../deps-managed.ts";
import { getSqliteDb } from "../../config/sqlite/dbclient.ts";

export async function addSqlFooController(ctx: Context) {
  let isReady = true;
  // sqlite db clent
  const db = getSqliteDb();

  //
  if (ctx.request.body().type == "json" && ctx.request.hasBody) {
    // extract data from body request
    const body = ctx.request.body({ type: "json" });
    const values = await body.value;
    const { text } = values;
    if (!text) isReady = false;
    if (text) {
      // inset data in db
      try {
        db.query("INSERT INTO todo_tasks (text) VALUES (?)", [text]);
        const id = db.lastInsertRowId;
        db.close();
        ctx.response.body = {
          id,
          text,
        };
      } catch (_error) {
        console.log(_error);
        isReady = false;
      }
    }
  }

  if (!isReady) {
    ctx.response.status = Status.NotFound;
    ctx.response.body = {
      details: "task dos'nt exist",
    };
  }
}
