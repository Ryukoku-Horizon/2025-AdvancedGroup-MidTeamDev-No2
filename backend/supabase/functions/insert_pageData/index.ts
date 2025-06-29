import { createClient } from "https://esm.sh/@supabase/supabase-js@2.48.1";
import "https://deno.land/std@0.217.0/dotenv/load.ts";

const allowedOrigins = [
  "http://localhost:8000",
  "http://localhost:3000"
];

const supabaseKey: string = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabaseUrl: string = Deno.env.get('SUPABASE_URL')!;

const supabase = createClient(supabaseUrl, supabaseKey);

const table = "pageData";

Deno.serve(async (req) => {
  console.log("a")
  const origin = req.headers.get("origin") || "";
  const isAllowed = allowedOrigins.includes(origin);
  const corsHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": isAllowed ? origin : "http://localhost:3000",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
  };
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }
  const { blocks,circleId } = await req.json();
  console.log(blocks);
  console.log(circleId)

  if(!blocks){
    console.error({error:"missing blocks"})
    return new Response(JSON.stringify({error:"missing blocks"}),{
      status:400,
      headers:corsHeaders
    })
  }
  if(!circleId){
    console.error({error:"missing circleId"})
    return new Response(JSON.stringify({error:"missing circleId"}),{
      status:400,
      headers:corsHeaders
    })
  }

  const { count } = await supabase
  .from(table)
  .select("*", { count: "exact", head: true })
  .match({ circleId });
  if (count === 0) {
    console.log("削除対象なし");
  } else {
    const {error} = await supabase.from(table).delete().match({circleId});
    if(error){
      console.error("error at delete",error)
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: corsHeaders,
      });
    }
  }

  // const parsedData = JSON.parse(blocks);
  for(const block of blocks){
    const {type,content,circleId} = block;
    if(!type){
      console.error({error:"missing type"})
      return new Response(JSON.stringify({error:"missing type"}),{
        status:400,
        headers:corsHeaders
      })
    }
    if(!circleId){
      console.error({error:"missing circleId"})
      return new Response(JSON.stringify({error:"missing circleId"}),{
        status:400,
        headers:corsHeaders
      })
    }
    if(!content){
      console.error({error:"missing content"})
      return new Response(JSON.stringify({error:"missing content"}),{
        status:400,
        headers:corsHeaders
      })
    }
    const {error} = await supabase.from(table).insert({type,content,circleId});
    if(error){
      console.error("error at insert",error)
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: corsHeaders,
      });
    }
  }
  return new Response(
    JSON.stringify({success:true}),
    { headers: corsHeaders},
    )
})

