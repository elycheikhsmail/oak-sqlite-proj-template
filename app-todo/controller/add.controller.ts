import { Context, Status } from "../deps-managed.ts";
import { getSqliteDb } from "../../config/sqlite/dbclient.ts";

export async function addController(ctx: Context) {
  // Default variable for minimise if else in code
  let isReady = true;
  // Default variable  details in response when inspect behavur happed
  let details = "";
  //Default variable for db
  let textDefault = "";
  let id = -1;
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
  // execute sql
  if (isReady) {
    try {
      const db = getSqliteDb();
      const sql = "INSERT INTO todo_tasks (text) VALUES (?)";
      const args = [textDefault]
      db.query(sql,args );
      id = db.lastInsertRowId;
      db.close();
    } catch (_error) {
      console.log(_error);
      isReady = false;
      details = "db connexion or sql execution failed";
    }
  }
  // write response 
  if (isReady) { 
    ctx.response.status = Status.Created ;
    ctx.response.body = {
      id,
      text: textDefault,
    };
  } else {
    ctx.response.status = Status.NotFound;
    ctx.response.body = { details };
  }
}
