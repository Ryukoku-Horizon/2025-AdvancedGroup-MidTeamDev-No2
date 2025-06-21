import { create } from "https://deno.land/x/djwt@v3.0.1/mod.ts";
import { decodeBase64 } from "https://deno.land/std@0.224.0/encoding/base64.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const SERVICE_ACCOUNT = Deno.env.get("SERVICE_ACCOUNT");
const allowedOrigins = [
  "http://localhost:8000",
  "https://ryukoku-horizon.github.io"
];

const supabaseKey: string = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabaseUrl: string = Deno.env.get('SUPABASE_URL')!;

const supabase = createClient(supabaseUrl, supabaseKey);

Deno.serve(async (req)=>{
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
  let body;
  try {
    body = await req.json();
  } catch (err) {
    console.error("JSON parse error:", err);
    return new Response(JSON.stringify({
      error: "Invalid JSON format"
    }), {
      status: 400,
      headers: corsHeaders
    });
  }
  const { id, password } = body;
  if (!id) {
    console.error("userIdを取得できませんでした");
    return new Response(JSON.stringify({
      error: "userIdを取得できませんでした"
    }), {
      headers: corsHeaders
    });
  }
  if (!password) {
    console.error("passwordを取得できませんでした");
    return new Response(JSON.stringify({
      error: "passwordを取得できませんでした"
    }), {
      headers: corsHeaders
    });
  }

  const { data, error } = await supabase
  .from("users")
  .select("*")
  .eq("id", id)

  if (error) {
    console.error("ユーザー取得エラー:", error);
    return new Response(JSON.stringify({ error: "ユーザーが見つかりません" }), {
      status: 404,headers:corsHeaders
    });
  }
  if(data===null){
    return new Response(JSON.stringify({
      error: "ユーザーが見つかりまんせん"
    }),{
      headers:corsHeaders,status:401
    })
  }

  const storedHash = data[0].password;
  const match = await comparePassword(password, storedHash);
  if (!match) {
    return new Response(JSON.stringify({
      error: "パスワードを間違えています"
    }), {
      status: 401,headers:corsHeaders
    });
  }
  console.log("SERVICE_ACCOUNT",SERVICE_ACCOUNT)
  const ServiceAccount = JSON.parse(SERVICE_ACCOUNT!)
  // ② Firebase JWTを生成
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: ServiceAccount.client_email,
    sub: ServiceAccount.client_email,
    aud: "https://identitytoolkit.googleapis.com/google.identity.identitytoolkit.v1.IdentityToolkit",
    iat: now,
    exp: now + 3600,
    uid: id
  };
  const header = {
    alg: "RS256" as const,
    typ: "JWT" as const
  };
  const pem = ServiceAccount.private_key;
  const key = await crypto.subtle.importKey(
    "pkcs8",
    convertPemToArrayBuffer(pem),
    {
        name: "RSASSA-PKCS1-v1_5",
        hash: "SHA-256",
    },
    false,
    ["sign"],
  );
  const jwt = await create(header, payload, key);
  return new Response(JSON.stringify({
    token: jwt
  }), {
    headers: corsHeaders
  });
});

function convertPemToArrayBuffer(pem: string): Uint8Array {
  const pemContents = pem
    .replace("-----BEGIN PRIVATE KEY-----", "")
    .replace("-----END PRIVATE KEY-----", "")
    .replace(/\n/g, "")
    .trim();

  return decodeBase64(pemContents); // ← Uint8Array 型
}

async function comparePassword(password: string,storedHash:string): Promise<boolean> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hashHex===storedHash;
}

