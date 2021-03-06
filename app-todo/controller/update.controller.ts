import { Context, Status } from "../deps-managed.ts";
import { getSqliteDb } from "../../config/sqlite/dbclient.ts";

export async function updateController(ctx: Context) {
  // Default variable for minimise if else in code
  let isReady = true;
  // Default variable  details in response when inspect behavur happed
  let details = "";
  //Default variable for db
  let textDefault = "";
  let id = -1;
  let dbTotalChanges = 0;
  // extract data from body
  if (ctx.request.body().type == "json" && ctx.request.hasBody) {
    // extract data from body request
    const body = ctx.request.body({ type: "json" });
    const values = await body.value;
    const { text } = values;
    if (!text) {
      isReady = false;
      details = "invalide text";
    } else textDefault = text;
  }else{
    isReady = false;
    details = "invalide request body type not json or empty";
  }
  // extract id
  if (isReady) {
    const pathname = ctx.request.url.pathname;
    const urlData = pathname.split("/");
    const idStr = String(urlData.at(-1));
    id = parseInt(idStr);
  }

  try {
    const db = getSqliteDb();
    const sql = "UPDATE todo_tasks SET text=? WHERE id = ? ";
    const args = [textDefault, id]
    db.query(sql, args);
    dbTotalChanges = db.totalChanges;
    console.log({dbTotalChanges})
    db.close();
  } catch (_error) {
    isReady = false;
    details = "failed to connect to the db or execute sql";
  }

  if (dbTotalChanges == 0) {
    isReady = false;
  } 

  if (isReady) {
    ctx.response.body = {
      id,
      text: textDefault,
      dbChanges : dbTotalChanges
    };
  } else {
    ctx.response.status = Status.NotFound;
    ctx.response.body = { details, dbChanges : dbTotalChanges };
  }

  //}
}
