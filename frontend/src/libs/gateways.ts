import { SUPABASE_ANON_KEY, SUPABASE_URL } from "../constants/supabase";

export const getPendingData=async(select:string,match?:{[key:string]:string})=>{
    try{
        const res = await fetch(`${SUPABASE_URL}/functions/v1/get_pending`,{
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
            return {success:false,data:null};
        }
        const data = await res.json();
        return {success:true,data}
    }catch(e){
        console.error("エラー:",e)
        return {success:false,data:e}
    }
}

export const getCircleData=async(select:string,match?:{[key:string]:string},limit?:number,offset?:number)=>{
    try{
        const res = await fetch(`${SUPABASE_URL}/functions/v1/get_circle`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
            },
            body:JSON.stringify({
                match,
                select,
                limit,
                offset
            })
        })
        if(!res.ok){
            console.error("データ取得に失敗しました");
            return {success:false,data:"データ取得に失敗しました"};
        }
        const data = await res.json();
        return {success:true,data}
    }catch(e){
        console.error("エラー:",e)
        return {success:false,data:e}
    }
}

export const getPageData=async(select:string,match?:{[key:string]:string})=>{
    try{
        const res = await fetch(`${SUPABASE_URL}/functions/v1/get_pageData`,{
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
            return {success:false,data:"データ取得に失敗しました"};
        }
        const data = await res.json();
        return {success:true,data}
    }catch(e){
        console.error("エラー:",e)
        return {success:false,data:e}
    }
}

export const searchCircleData=async(searchKeyword:string,limit?:number,offset?:number)=>{
    try{
        const res = await fetch(`${SUPABASE_URL}/functions/v1/search_circle`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
            },
            body:JSON.stringify({
                limit, offset,searchKeyword
            })
        })
        if(!res.ok){
            console.error("データ取得に失敗しました");
            return {success:false,data:"データ取得に失敗しました"};
        }
        const data = await res.json();
        return {success:true,data}
    }catch(e){
        console.error("エラー:",e)
        return {success:false,data:e}
    }
}