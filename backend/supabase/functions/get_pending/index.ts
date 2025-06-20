import { createClient } from "https://esm.sh/@supabase/supabase-js@2.48.1";
import "https://deno.land/std@0.217.0/dotenv/load.ts";

const allowedOrigins = [
  "http://localhost:8000",
];

const supabaseKey: string = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabaseUrl:string = Deno.env.get('SUPABASE_URL')!;

const supabase = createClient(supabaseUrl, supabaseKey);

const table = "pending"

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
  const { match, select } = await req.json();

  if (!select) {
    return new Response(JSON.stringify({ error: "Missing select" }), {
      status: 400,
      headers: corsHeaders
    });
  } 
  
  if(!match || Object.keys(match).length === 0){
    const { data, error } = await supabase.from(table).select(select);
    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: corsHeaders
      });
    }
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: corsHeaders
      
    });
  }

  const { data, error } = await supabase.from(table).select(select).match(match);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: corsHeaders
    });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: corsHeaders
    
  });
});
