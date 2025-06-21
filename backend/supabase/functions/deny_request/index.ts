// supabase/functions/send-email/index.ts
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import "https://deno.land/x/dotenv@v3.2.2/load.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const allowedOrigins = [
  "http://localhost:8000",
];

const supabaseKey: string = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabaseUrl: string = Deno.env.get('SUPABASE_URL')!;

const supabase = createClient(supabaseUrl, supabaseKey);

serve(async (req) => {
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

  const { id,email,name } = await req.json();

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

  const SENDGRID_API_KEY = Deno.env.get("SENDGRID_API_KEY");
  const sender = Deno.env.get("SENDER_EMAIL"); 

  const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${SENDGRID_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email }] }],
      from: { email: sender },
      subject:"【龍谷サークルHub】申請見送りのお知らせ",
      content: [{ type: "text/html", value: `
        <p> ${name}様</p>
        <p>龍谷サークルHubのページ作成に申請していただきありがとうございます。</p>
        <p>今回は申請を見送らせていただくことになりました</p>

        <p>今後ともよろしくお願いします</p>
      `.trim()}],
      mail_settings: {
        sandbox_mode: { enable: false }  
      }
    }),
  });

  if (res.ok) {
    const { error } = await supabase.from("pending").delete().eq("id", id);
    if(error){
      console.error("Insert error:", error);
      return new Response(JSON.stringify({ error: "Failed to delete pending" }), {
        status: 500,
        headers: corsHeaders
      });
    }
    return new Response(JSON.stringify({success:true}), { status: 200,headers: corsHeaders });
  } else {
    const error = await res.text();
    return new Response(`エラー: ${error}`, { status: 500,headers: corsHeaders });
  }
});
