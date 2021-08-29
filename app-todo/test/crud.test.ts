// deno test --allow-all --unstable crud.test.ts

import * as t from "https://deno.land/std@0.102.0/testing/asserts.ts";

import { fetchHepler } from "../../libs/fetch-as-class.ts";

fetchHepler.setUrl("http://localhost:3000/todo");

Deno.test(
  "test add task",
  async () => {
    fetchHepler.setBaseUrl("http://localhost:3000");
    fetchHepler.setPathname("/todo");
    const data = JSON.stringify({ text: "test1" });
    const response = await fetchHepler.POST(data);
    const bodyAsJson = await response.json();
    t.assertEquals(bodyAsJson.text, "test1");
    t.assertEquals(bodyAsJson.id, 1);
  },
);

// test invalide data
Deno.test(
  "test add invalid task via invalid json",
  async () => {  
    fetchHepler.setContentType(false)
    fetchHepler.setHeaders()
    const response = await fetchHepler.POST("data"); 
     await response.text();
    t.assertEquals(response.status, 404); 
  },
);

Deno.test(
  "test add valid json but invalid data",
  async () => {  
    fetchHepler.setContentType(true)
    fetchHepler.setHeaders()

    const data = JSON.stringify({ text2: "test1" });
    const response = await fetchHepler.POST(data); 
     await response.text();
    t.assertEquals(response.status, 404); 
  },
);
Deno.test(
  "test list tasks",
  async () => { 
    fetchHepler.setContentType(true)
    fetchHepler.setHeaders()
    const response = await fetchHepler.GET();
    const bodyAsJson = await response.json();
    t.assertEquals(bodyAsJson.length, 1); 
  },
);

Deno.test(
  "test update existing task",
  async () => { 
    fetchHepler.setPathname("/todo/1")
    const data = JSON.stringify({ text: "test updated" });
    const response = await fetchHepler.PUT(data);
    const bodyAsJson = await response.json();
    t.assertEquals(bodyAsJson.id, 1); 
    t.assertEquals(bodyAsJson.text, "test updated" ); 
  },
);
 
Deno.test(
  "test update task does'nt exist",
  async () => { 
    fetchHepler.setPathname("/todo/5")
    const data = JSON.stringify({ text: "test updated ok" });
    const response = await fetchHepler.PUT(data); 
    const _d =await response.json(); 
    t.assertEquals(response.status, 404); 
   // t.assertEquals(bodyAsJson.text, "test updated" ); 
  },
);
 
Deno.test(
  "test update existing task",
  async () => { 
    fetchHepler.setPathname("/todo/1") 
    
    const data = JSON.stringify({ text: "test updated" });
    const response = await fetchHepler.PUT(data); 

    const bodyAsJson = await response.json(); 

    t.assertEquals( bodyAsJson.dbChanges  , 1);  
  },
);

Deno.test(
  "test delete task does'nt exist",
  async () => { 
    fetchHepler.setPathname("/todo/5") 
    const response = await fetchHepler.DELETE();
    const _d =await response.text(); 
    t.assertEquals(response.status, 404); 
   // t.assertEquals(bodyAsJson.text, "test updated" ); 
  },
);
 
Deno.test(
  "test delete existing delete",
  async () => { 
    fetchHepler.setPathname("/todo/1") 
    const response = await fetchHepler.DELETE();
    const _d =await response.text(); 
    t.assertEquals(response.status, 204); 
   // t.assertEquals(bodyAsJson.text, "test updated" ); 
  },
);
 