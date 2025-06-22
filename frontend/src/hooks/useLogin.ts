import { useEffect, useState } from "react";
import useFirebaseUser from "./useFirebase";
import { SUPABASE_URL, SUPABASE_ANON_KEY} from "../constants/supabase";
import { useNavigate } from "react-router-dom"

const useLogin=()=>{
    const [errMessage,setErrMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const { loginWithCustomToken,user } = useFirebaseUser();
    const navigate = useNavigate();

    useEffect(()=>{
        if(user){
            setTimeout(()=>{
                navigate(`/manage/${user.uid}`)
            },1500);
        }
    },[user])

    const login=async(userId:string,password:string)=>{
        setLoading(true)
        try{
            const res = await fetch(`${SUPABASE_URL}/functions/v1/auth_circle`, {
                method: "POST",
                headers: { "Content-Type": "application/json","Authorization": `Bearer ${SUPABASE_ANON_KEY}` },
                body: JSON.stringify({ id:userId,password }),
                mode: "cors"
            });
            if(!res.ok){
                setErrMessage(`${res.status}：${await res.text()}`);
                console.error("Error:", res.status, await res.text());
                return;
            }
            const { token } = await res.json();
            try{
                await loginWithCustomToken(token)
            }catch(e){
                setErrMessage(`ログインに失敗しました:${e}`)
            }
        }catch(e){
            setErrMessage(`ログインに失敗しました:${e}`)
        }finally{
            setLoading(false)
        }
    }

    return { login,errMessage,loading,user }
}

export default useLogin;