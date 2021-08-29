import { IgController } from "./args.ts";
// dunjucks
import nunjucks from "https://deno.land/x/nunjucks@3.2.3/mod.js"; 
//
import { gController } from "./fn.ts";

export function gControllerList(c: IgController) { 
  nunjucks.configure("cli/gControllerWithSql/views");
  try {
    // controller file 
    const text = nunjucks.render("cList.j2", c);
     gController(c,text)

  } catch (error) {
    console.log(error);
  }
}
