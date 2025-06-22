import { Link } from "react-router-dom";
import "./RequireLoginMessage.css";

const RequireLoginMessage = () => {
  return (
    <div className="require-login-container">
      <h2 className="require-login-title">ログインが必要です</h2>
      <p className="require-login-text">
        このページを表示するにはログインしてください。
      </p>
      <Link to="/login" className="require-login-button">
        ログインページへ
      </Link>
    </div>
  );
};

export default RequireLoginMessage;
