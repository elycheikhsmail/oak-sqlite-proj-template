import { DB } from "https://deno.land/x/sqlite@v3.1.1/mod.ts"; 
export function getSqliteDb(){
    let sqlieFileName = Deno.env.get("OAK_SQLITE_FILE")
    ? Deno.env.get("OAK_SQLITE_FILE")
    : "config/db.sqlite3";
  sqlieFileName = String(sqlieFileName);
  const db = new DB(sqlieFileName);
  return db
}