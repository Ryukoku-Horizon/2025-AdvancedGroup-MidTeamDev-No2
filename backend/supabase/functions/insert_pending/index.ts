import { createClient } from "https://esm.sh/@supabase/supabase-js@2.48.1";
import "https://deno.land/std@0.217.0/dotenv/load.ts";

const allowedOrigins = [
  "http://localhost:8000",
];

const supabaseKey: string = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabaseUrl: string = Deno.env.get('SUPABASE_URL')!;

const supabase = createClient(supabaseUrl, supabaseKey);

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
  const { email,name,detail,activeDate,location } = await req.json();

  if(!email){
    return new Response(JSON.stringify({error:"missing email"}),{
      status:400,
      headers:corsHeaders
    })
  }
  if(!name){
    return new Response(JSON.stringify({error:"missing name"}),{
      status:400,
      headers:corsHeaders
    })
  }
  if(!detail){
    return new Response(JSON.stringify({error:"missing detail"}),{
      status:400,
      headers:corsHeaders
    })
  }
  if(!activeDate){
    return new Response(JSON.stringify({error:"missing activeDate"}),{
      status:400,
      headers:corsHeaders
    })
  }
  if(!location){
    return new Response(JSON.stringify({error:"missing location"}),{
      status:400,
      headers:corsHeaders
    })
  }

  const {error} = (await supabase.from("pending").insert({email,name,detail,activeDate,location}))
  if(error){
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: corsHeaders,
    });
  }
  return new Response(
    JSON.stringify({success:true}),
    { headers: corsHeaders},
    )
})

