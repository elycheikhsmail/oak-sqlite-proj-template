// deno run --allow-all --unstable helper.ts
import * as fs from "https://deno.land/std@0.106.0/fs/mod.ts";

import { getSqliteDb } from "./sqlite/dbclient.ts";

export async function dropSqliteTestFile() {
  if ( await fs.exists("./config/test.sqlite3")) {
    try {
      await Deno.remove("./config/test.sqlite3");
    } catch (_error) {
      //console.log(error)
      console.log("config/test.sqlite3 dos't exist");
      // create table for apps to test
    }
  }
}

export function executeSqlReadenFromFile(text: string) {
  const db = getSqliteDb();
  const sqlStatements = text.split(";");
  for (const sql of sqlStatements) {
    if (sql) db.query(sql);
  }
  db.close();
}

export function createTable(sqlFileToExecute: string) {
  const sql = Deno.readTextFileSync(sqlFileToExecute);
  executeSqlReadenFromFile(sql);
  console.log("init db success");
}

export async function createAllTables() {
 
  for await (const f of fs.walk("./", { maxDepth: 1, includeFiles: false })) {
    if (f.name.startsWith("app-")) {
      console.log(f.name);
      const p = `./${f.name}/config/db/sqlite.sql`;
      const b = await fs.exists(p);
      if (b) {
        console.log("we will execute sql in ", p);
        createTable(`${f.name}/config/db/sqlite.sql`);
        console.log("");
      } else {
        console.log("no sqlite.sql for : ", f.name);
        console.log("");
      }
    }
  }
}

