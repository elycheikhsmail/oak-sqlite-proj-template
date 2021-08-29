// be in project root and  run the folowing command to see all available commandes
// deno run --allow-all  --watch --unstable appCli.ts

import { helpMessage } from "./cli/helpers/help-message.ts";
import { run as rungDefaultAddRoutes } from "./cli/gDefaultAddRoute/run.ts";
import { buildApp } from "./cli/gApp/fn.ts";
//import { gController as buildController } from "./gController/fn.ts";
import { methodsArrays } from "./cli/gControllerWithSql/args.ts";
import { gControllerAdd } from "./cli/gControllerWithSql/mod.ts";
import { gControllerList } from "./cli/gControllerWithSql/mod.ts";
import { gControllerDelete } from "./cli/gControllerWithSql/mod.ts";
import { gControllerUpdate } from "./cli/gControllerWithSql/mod.ts";
import { gControllerDefault } from "./cli/gControllerWithSql/mod.ts";

console.log("cwd")
//
Deno.chdir("./")
console.log(Deno.cwd())
let isDone = false;

if (!isDone && Deno.args.length == 1 && Deno.args[0] == "-h") {
  isDone = true;
  helpMessage();
}

// deno run --allow-all --unstable appCli.ts  gApp auth /auth
// deno run --allow-all --unstable appCli.ts  gApp foo /foo
if (!isDone && Deno.args.length == 3 && Deno.args[0] == "gApp") {
  isDone = true;
  await buildApp({
    appName: Deno.args[1],
    appUrlPrefix: Deno.args[2],
  });
  gControllerDefault({
    appName: Deno.args[1],
    controllerName: "index",
    contollerMethod: "get",
    controllerUrlPrefix: "/",
  });
}

// deno run --allow-all --unstable appCli.ts  gControllerDefault foo index  get  /
if (!isDone && Deno.args.length == 5 && Deno.args[0] == "gControllerDefault") {
  isDone = true;
  console.log(Deno.args[3]);
  const a = methodsArrays.filter(
    (v) => v == Deno.args[3],
  );
  if (a.length == 1) {
    gControllerDefault({
      appName: Deno.args[1],
      controllerName: Deno.args[2],
      contollerMethod: Deno.args[3],
      controllerUrlPrefix: Deno.args[4],
    });
  } else {
    console.log("invalide http method");
  }
}

// deno run --allow-all --unstable appCli.ts  gControllerSqlAdd  auth registerSqlAuth /register
// deno run --allow-all --unstable appCli.ts  gControllerSqlAdd foo addSqlFoo /
if (!isDone && Deno.args.length == 4 && Deno.args[0] == "gControllerSqlAdd") {
  isDone = true;
  gControllerAdd({
    appName: Deno.args[1],
    controllerName: Deno.args[2],
    contollerMethod: "post",
    controllerUrlPrefix: Deno.args[3],
  });
}


// deno run --allow-all --unstable appCli.ts  gControllerSqlList auth loginSqlAuth /login
// deno run --allow-all --unstable appCli.ts  gControllerSqlList foo indexSqlFoo /
if (!isDone && Deno.args.length == 4 && Deno.args[0] == "gControllerSqlList") {
  isDone = true;
  gControllerList({
    appName: Deno.args[1],
    controllerName: Deno.args[2],
    contollerMethod: "get",
    controllerUrlPrefix: Deno.args[3],
  });
  console.log("update route for avoid conflict / route ")
}

// deno run --allow-all --unstable appCli.ts  gControllerSqlDelete foo deleteteSqlFoo /:id
if (!isDone && Deno.args.length == 4 && Deno.args[0] == "gControllerSqlDelete") {
  isDone = true;
  gControllerDelete({
    appName: Deno.args[1],
    controllerName: Deno.args[2],
    contollerMethod: "delete",
    controllerUrlPrefix: Deno.args[3],
  });
}

// deno run --allow-all --unstable appCli.ts  gControllerSqlUpdate foo updateSqlFoo /:id
if (!isDone && Deno.args.length == 4 && Deno.args[0] == "gControllerSqlUpdate") {
  isDone = true;
  gControllerUpdate({
    appName: Deno.args[1],
    controllerName: Deno.args[2],
    contollerMethod: "put",
    controllerUrlPrefix: Deno.args[3],
  });
}




// deno run --allow-all --unstable appCli.ts  gexample
if (!isDone && Deno.args.length == 1 && Deno.args[0] == "gexample") {
  isDone = true;
  Deno.removeSync("./app-example", { recursive: true });
  Deno.removeSync("./server/add-routes.ts");
  rungDefaultAddRoutes();
  buildApp({
    appName: "example",
    appUrlPrefix: "/",
  });
  gControllerDefault({
    appName: "example",
    controllerName: "index",
    contollerMethod: "get",
    controllerUrlPrefix: "/",
  });
}

if (!isDone) {
   console.log("read appCli.ts file content")
   console.log(" appCli examples of possibles commands are in appCli.ts ")
}
// deno run --allow-all  --unstable appCli.ts
