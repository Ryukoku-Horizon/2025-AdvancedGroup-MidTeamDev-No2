import { createClient } from "https://esm.sh/@supabase/supabase-js@2.48.1";
import "https://deno.land/std@0.217.0/dotenv/load.ts";

const allowedOrigins = [
  "http://localhost:8000",
  "http://localhost:3000"
];

const supabaseKey: string = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabaseUrl:string = Deno.env.get('SUPABASE_URL')!;

const supabase = createClient(supabaseUrl, supabaseKey);

const table = "circles"

Deno.serve(async (req) => {
  const origin = req.headers.get("origin") || "";
  const isAllowed = allowedOrigins.includes(origin);
  const corsHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": isAllowed ? origin : "",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
  };
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }
  const { id,email,name,location,activeDate,detail } = await req.json();

  if (!id) {
    return new Response(JSON.stringify({ error: "Missing id" }), {
      status: 400,
      headers: corsHeaders
    });
  } 
  if (!email) {
    return new Response(JSON.stringify({ error: "Missing email" }), {
      status: 400,
      headers: corsHeaders
    });
  } 
  if (!name) {
    return new Response(JSON.stringify({ error: "Missing name" }), {
      status: 400,
      headers: corsHeaders
    });
  } 
  if (!location) {
    return new Response(JSON.stringify({ error: "Missing location" }), {
      status: 400,
      headers: corsHeaders
    });
  } 
  if (!activeDate) {
    return new Response(JSON.stringify({ error: "Missing activeDate" }), {
      status: 400,
      headers: corsHeaders
    });
  } 
  if (!detail) {
    return new Response(JSON.stringify({ error: "Missing detail" }), {
      status: 400,
      headers: corsHeaders
    });
  } 

  const { error } = await supabase.from(table)
  .update({id,email,name,location:JSON.stringify(location),activeDate:JSON.stringify(activeDate),detail})
  .eq("id",id)

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: corsHeaders
    });
  }

  return new Response(JSON.stringify({success:true}), {
    status: 200,
    headers: corsHeaders
  });
});
