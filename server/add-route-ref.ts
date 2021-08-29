import { app } from "./add-middlares-befor.ts"; 
  
//import route
import {  routes as exampleRoutes } from "../app-example/mod.ts";
app.use(exampleRoutes.prefix("/").routes())
app.use(exampleRoutes.allowedMethods())
//end import route

      //import route
import {  routes as todoRoutes } from "../app-todo/mod.ts";
app.use(todoRoutes.prefix("/todo").routes())
app.use(todoRoutes.allowedMethods())
//end import route
export{app}
      