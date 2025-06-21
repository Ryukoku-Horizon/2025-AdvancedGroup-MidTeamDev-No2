const dotenv = require("dotenv")
dotenv.config()

const SUPABASE_URL = process.env.GATSBY_SB_URL;
const SUPABASE_ANON_KEY = process.env.GATSBY_SB_ANON_KEY;

const getCircleData=async(select,match)=>{
    const res = await fetch(`${SUPABASE_URL}/functions/v1/get_circle`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
        },
        body:JSON.stringify({
            match,
            select
        })
    })
    if(!res.ok){
        console.error("データ取得に失敗しました");
        throw new Error("データ取得に失敗しました")
    }
    const data = await res.json();
    
    return data;
}

module.exports = { getCircleData };