import { Context, Router } from "https://deno.land/x/oak@v9.0.0/mod.ts";
const routes = new Router(); 

//  
//import { indexController } from "./controller/index.controller.ts";
//routes.get("/", async (ctx: Context) => await indexController(ctx));

//  
import { addSqlFooController } from "./controller/addSqlFoo.controller.ts";
routes.post("/", async (ctx: Context) => await addSqlFooController(ctx));

//  
import { indexSqlFooController } from "./controller/indexSqlFoo.controller.ts";
routes.get("/", async (ctx: Context) => await indexSqlFooController(ctx));

//  
import { updateSqlFooController } from "./controller/updateSqlFoo.controller.ts";
routes.put("/:id", async (ctx: Context) => await updateSqlFooController(ctx));

//  
import { deleteteSqlFooController } from "./controller/deleteteSqlFoo.controller.ts";
routes.delete("/:id", async (ctx: Context) => await deleteteSqlFooController(ctx));
export { routes };