import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import "../styles/login.css"; 
import LoginForm from "../components/pageComponents/login/loginForm";

function Login() {
    return (
        <Layout>
            <div className="login-container">
                <div className="login-card">
                    <Link to="/" className="login-link">← ホームページへ</Link>
                    <h1 className="login-title">ログイン</h1>
                    <LoginForm />
                </div>
            </div>
        </Layout>
    );
}

export default Login;
