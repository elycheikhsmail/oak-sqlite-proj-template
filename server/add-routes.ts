import { app } from "./add-middlares-befor.ts";

//import route
import { routes as exampleRoutes } from "../app-example/mod.ts";
app.use(exampleRoutes.prefix("/").routes());
app.use(exampleRoutes.allowedMethods());
//end import route

//import route
import { routes as todoRoutes } from "../app-todo/mod.ts";
app.use(todoRoutes.prefix("/todo").routes());
app.use(todoRoutes.allowedMethods());
//end import route

//import route
import { routes as fooRoutes } from "../app-foo/mod.ts";
app.use(fooRoutes.prefix("/foo").routes());
app.use(fooRoutes.allowedMethods());
//end import route
//import route
import { routes as authRoutes } from "../app-auth/mod.ts";
app.use(authRoutes.prefix("/auth").routes());
app.use(authRoutes.allowedMethods());
//end import route
export { app };