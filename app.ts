// for start app run this code
// deno run --allow-all --unstable app.ts
// deno run --allow-all --unstable app.ts --mode=test
// or see cli.md
// third party module
import { parse } from "https://deno.land/std@0.105.0/flags/mod.ts";
//local import
import { app } from "./server/add-middlwares-after.ts";
import { createAllTables, dropSqliteTestFile } from "./config/helper.ts";

// for insure compatiblity
import { settings } from "./config/mod.ts";
settings.compareDenoVersion(settings.denoSupportedVersion);
// extract arg data
const { args } = Deno;
const DEFAULT_PORT = 3000;
const argMode = parse(args).mode;
const argPort = parse(args).port;
console.log({ argPort });
const mode = argMode ? argMode : "dev";
console.log({mode})
if (mode && mode == "test") {
  Deno.env.set("OAK_SQLITE_FILE", "config/test.sqlite3");
  await dropSqliteTestFile();
  await createAllTables();
}

const port = argPort ? Number(argPort) : DEFAULT_PORT;
console.log({ port });
console.log("=====================================================================================")

await app.listen({ port });

 
// deno run --allow-all --unstable app.ts
