import useLogin from "../hooks/useLogin";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useState } from "react";
import UserIdInput from "../components/pageComponents/login/userIdInput";
import PasswordInput from "../components/pageComponents/login/passwordInput";
import ConfirmButton from "../components/common/Btn/confirmBtn/confirmBtn";
import SuccessCheck from "../components/common/checkmark/successCheck";
import "../styles/login.css"; 

function Login() {
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
        <Layout>
            <div className="login-container">
                <div className="login-card">
                    <Link to="/" className="login-link">← ホームページへ</Link>
                    <h1 className="login-title">ログイン</h1>

                    <UserIdInput input={userId} setInput={setUserId} error={userIdErr} />
                    <PasswordInput input={password} setInput={setPassword} error={passwordErr} />

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
                </div>
            </div>
        </Layout>
    );
}

export default Login;
