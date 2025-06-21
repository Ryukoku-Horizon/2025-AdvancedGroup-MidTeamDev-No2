// supabase/functions/send-email/index.ts
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import "https://deno.land/x/dotenv@v3.2.2/load.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { generatePassword, generateUserId, hashPassword } from "./generateChar.ts";

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

  const SENDGRID_API_KEY = Deno.env.get("SENDGRID_API_KEY");
  const sender = Deno.env.get("SENDER_EMAIL"); 

  const password = generatePassword(16);
  console.log("password",password)
  const hashed = await hashPassword(password);

  let userId = generateUserId();
  while(true){
    const { data: existingUser } = await supabase
    .from("users")
    .select("id")
    .eq("id", userId)
    .single();

    if(!existingUser){
      break;
    }else{
      userId = generateUserId()
    }
  }

  const { error:err1 } = await supabase.from("users").insert([{ id:userId, password: hashed }]);
  if (err1) {
    console.error("Insert error:", err1);
    return new Response(JSON.stringify({ error: "Failed to register users" }), {
      status: 500,
      headers: corsHeaders
    });
  }
  const location_ = JSON.stringify(location)
  const activeDate_ = JSON.stringify(activeDate)
  const { error:err2 } = await supabase.from("circles").insert([{id:userId,name,location:location_,activeDate:activeDate_,detail,email}])
  if (err2) {
    console.error("Insert error:", err2);
    return new Response(JSON.stringify({ error: "Failed to insert circles" }), {
      status: 500,
      headers: corsHeaders
    });
  }

  const url = "https://ryukoku-horizon.github.io/horizon-atlas"

  const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${SENDGRID_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email }] }],
      from: { email: sender },
      subject:"【龍谷サークルHub】アカウント作成のお知らせ",
      content: [{ type: "text/html", value: `
        <p> ${name}さま</p>
        <p>龍谷サークルHubのページ作成に申請していただきありがとうございます。</p>
        <p>申請を承認し、アカウントを作成しました。</p>

        <p>以下がユーザーIDとパスワードです</p>
        <p>ユーザーID:${userId}</p>
        <p>パスワード:${password}</p>

        <p>こちらからログインしてください:${url}</p>
      `.trim()}],
      mail_settings: {
        sandbox_mode: { enable: false }  
      }
    }),
  });

  if (res.ok) {
    const { error:err3 } = await supabase.from("pending").delete().eq("id", id);
    if(err3){
      console.error("Insert error:", err3);
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
