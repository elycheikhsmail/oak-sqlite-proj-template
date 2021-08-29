// deno test --allow-all --unstable auth.test.ts

import * as t from "https://deno.land/std@0.102.0/testing/asserts.ts";

import { fetchHepler } from "../../libs/fetch-as-class.ts";
 
fetchHepler.setBaseUrl("http://localhost:3000")

Deno.test(
  "test register user",
  async () => { 
    fetchHepler.setPathname("/auth/register");
    const data = JSON.stringify({ username: "sidi" ,password:"1234"});
    const response = await fetchHepler.POST(data);
    //const bodyAsJson = 
    await response.json();
    t.assertEquals(response.status, 200); 
  },
);

Deno.test(
  "test register already exist user",
  async () => {  
    const data = JSON.stringify({ username: "sidi" ,password:"1234"});
    const response = await fetchHepler.POST(data);
    const bodyAsJson = await response.json();
    t.assertEquals(response.status, 404); 
    t.assertEquals(bodyAsJson.details, "user alredy exist"); 
    
  },
);


Deno.test(
  "test login valid user",
  async () => { 
    fetchHepler.setPathname("/auth/login");
    const data = JSON.stringify({ username: "sidi" ,password:"1234"});
    const response = await fetchHepler.POST(data);
    const bodyAsJson = await response.text();
    console.log(bodyAsJson)
    t.assertEquals(response.status, 200); 
  },
);
