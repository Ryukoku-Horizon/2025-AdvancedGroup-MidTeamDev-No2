import "https://deno.land/std@0.217.0/dotenv/load.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.48.1";
import { GoogleGenerativeAI } from "npm:@google/generative-ai";

const allowedOrigins = [
  "http://localhost:8000",
  "http://localhost:3000"
];

const supabaseKey: string = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabaseUrl:string = Deno.env.get('SUPABASE_URL')!;

const supabase = createClient(supabaseUrl, supabaseKey);

const table = "circles"

type QandA = {
  q:string;
  a:string;
}

type CircleEntity={
  id:number | string;
  email:string;
  name:string;
  location:string;
  activeDate:string;
  detail:string;
  image:string;
}

type ActiveDate={
  type: string;
  data: {
      week:string[];
      start:string;
      end:string;
  } | string;
}

const geminiApiKey:string = Deno.env.get('GEMINI_API_KEY')!;
const genAI = new GoogleGenerativeAI(geminiApiKey)

async function runGemini(prompt:string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(prompt);
  const response = result.response;
  return response.text()
}

function extractCircleIdsFromResponse(responseText: string, circleData: CircleEntity[]) {
  const matchedIds = [];

  for (const circle of circleData) {
    if (responseText.includes(circle.name)) {
      matchedIds.push(circle.id);
    }
  }

  return matchedIds;
}

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
  const { QandAs }:{QandAs:QandA[]} = await req.json();

  if (!QandAs) {
    console.error("Missing QandAs")
    return new Response(JSON.stringify({ error: "Missing QandAs" }), {
      status: 400,
      headers: corsHeaders
    });
  } 
  if (QandAs.length===0) {
    console.error("No Elements of QandAs")
    return new Response(JSON.stringify({ error: "No Elements of QandAs" }), {
      status: 400,
      headers: corsHeaders
    });
  } 

  const {data,error} = await supabase.from(table).select("*")
  console.log("data",data)

  if (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: corsHeaders
    });
  }
  if(data && data.length!==0){
    const circleData = data as CircleEntity[]

    const prompt = `
あなたは進路指導の先生です。
以下の生徒の情報をもとに、この生徒に向いている部活動を1つ挙げてください。
それぞれ、理由も説明してください。理由はできるだけ端的に話してください。

また、部活動を挙げる際には、必ず以下の形式で「部活名」と「id」をセットで返してください。
{部活ID: [id]}
部活名: [部活名]\n
理由: [理由]

【生徒の情報】
${QandAs.map((item) => ` - ${item.q}:${item.a}\n`).join("")}

【部活動の候補】：
${circleData.map((item)=>{
  const activeDate:ActiveDate = JSON.parse(item.activeDate);
  const freq = activeDate.type
  const date = typeof activeDate.data==="string" ?
    `活動時間の詳細:${activeDate.data}` :
  `活動曜日:${activeDate.data.week.map((item)=>`・${item}`)}`

  return `${item.id}. 部活名:${item.name},\n活動内容:${item.detail}\n活動キャンパス:${item.location}\n活動頻度:${freq}\n${date}`
}).join("\n")}
    `;  
    try{
      const response = await runGemini(prompt)
      const cleaned = response.replace(/\{[^}]*\}/g, '');
      const id = extractCircleIdsFromResponse(response,circleData)
      return new Response(JSON.stringify({response:cleaned,id}), {
        status: 200,
        headers: corsHeaders
      });
    }catch(e){
      console.error(error)
        return new Response(JSON.stringify({ error:e }), {
          status: 500,
          headers: corsHeaders,
        });
    }
  }
  console.error("not found CircleData")
  return new Response(JSON.stringify({ error:"not found CircleData" }), {
    status: 500,
    headers: corsHeaders,
  });
});
