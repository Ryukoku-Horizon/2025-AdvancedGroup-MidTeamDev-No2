import { ClipLoader } from "react-spinners"
import ConfirmButton from "../../common/Btn/confirmBtn/confirmBtn"
import PasswordInput from "./passwordInput"
import UserIdInput from "./userIdInput"
import SuccessCheck from "../../common/checkmark/successCheck"
import { useState } from "react"
import useLogin from "../../../hooks/useLogin"

const LoginForm=()=>{
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const { login, loading, errMessage, user } = useLogin();
    const [userIdErr, setUserIdErr] = useState(false);
    const [passwordErr, setPasswordErr] = useState(false);

    const handleLogin = async () => {
        if (userId !== "" && password !== "") {
            await login(userId, password);
        } else {
            if (userId === "") setUserIdErr(true);
            if (password === "") setPasswordErr(true);
        }
    };

    return (
        <>
            <UserIdInput input={userId} setInput={setUserId} error={userIdErr} />
            <PasswordInput input={password} setInput={setPassword} error={passwordErr} onEnterDown={()=>{handleLogin()}} />
            {!loading && !user && (
                <ConfirmButton onClick={handleLogin} className="mt-5">
                ログイン
                </ConfirmButton>
            )}
            {loading && <ClipLoader color="#3182ce" size={40} />}
            {user && <div className="flex justify-center">
                <SuccessCheck size={50} />
            </div>}

            {errMessage && <p className="login-error">{errMessage}</p>}
        </>
    )
}

export default LoginForm;