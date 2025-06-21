import * as React from "react";
import useLogin from "../hooks/useLogin";
import { ClipLoader } from "react-spinners";
import { Link } from "gatsby";
import Layout from "../components/Layout/Layout";
import { useState } from "react";
import UserIdInput from "../components/pageComponents/login/userIdInput";
import PasswordInput from "../components/pageComponents/login/passwordInput";
import ConfirmButton from "../components/common/Btn/confirmBtn/confirmBtn";
import SuccessCheck from "../components/common/checkmark/successCheck";

function Login() {
    const [userId,setUserId] = useState("");
    const [password,setPassword] = useState("");
    const { login,loading,errMessage,user } = useLogin();
    const [userIdErr,setUserIdErr] = useState(false);
    const [passwordErr,setPasswordErr] = useState(false);

    const handleLogin=async()=>{
        if(userId!=="" && password!==""){
            await login(userId,password)
        }else{
            if(userId==="") setUserIdErr(true);
            if(password==="") setPasswordErr(true)
        }
    }

    return (
        <Layout>
            <div>
                <Link to="/">ホームページ</Link>
                <h1>Login Page</h1>
                <UserIdInput input={userId} setInput={setUserId} error={userIdErr} />
                <PasswordInput input={password} setInput={setPassword} error={passwordErr} />
                {!loading && !user && <ConfirmButton onClick={async()=>{await handleLogin()}}>
                    ログイン
                </ConfirmButton>}
                {loading && <ClipLoader color="#36d7b7" size={50}  />}
                {errMessage!=="" && <p>{errMessage}</p>}
                {user && <SuccessCheck size={50} />}
            </div>
        </Layout>
    );
  }

export default Login;
  