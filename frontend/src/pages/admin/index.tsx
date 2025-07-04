import usePendingData from "../../hooks/usePendingData";
import SingleRequest from "../../components/pageComponents/admin/singleRequest";
import Layout from "../../components/Layout/Layout";
import ConfirmButton from "../../components/common/Btn/confirmBtn/confirmBtn";
import CenterLoader from "../../components/common/loader/centerLoader";
import '../../styles/admin.css';
import { useState } from "react";
import Modal from 'react-modal'
import PasswordInput from "../../components/pageComponents/login/passwordInput";

const Admin = () => {
    const {pendingData, loading, setN, n, setPendingData} = usePendingData()
    const [isAuthenticated,setIsAuthenticated] = useState(false)
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const correctPassword = process.env.REACT_APP_ADMIN_PASSWORD;

    const handleSubmit = () => {
        if (password === correctPassword) {
            setIsAuthenticated(true);
        } else {
            setError("パスワードが違います");
        }
    };

    if (!isAuthenticated) {
        return (
            <Modal
            isOpen={!isAuthenticated}
            className="approve-modal"
            overlayClassName="approve-overlay">
                <div className="admin-auth-container">
                    <div className="flex flex-col justify-center items-center">
                        <h2>管理ページパスワード</h2>
                        <div className="flex flex-col items-center gap-2">
                            <PasswordInput
                                input={password}
                                setInput={setPassword}
                                error={false}
                                onEnterDown={handleSubmit}
                            />
                            <ConfirmButton onClick={()=>handleSubmit()}>確定</ConfirmButton>
                        </div>
                    </div>
                    {error && <p className="auth-error">{error}</p>}
                </div>
            </Modal>
        );
    }

    return (
        <Layout>
            <div className="admin-container">
                <h1 className="admin-title">申請一覧</h1>

                {n === 0 && (
                    <div className="admin-center">
                        <ConfirmButton onClick={() => setN(1)}>
                            申請を読み込む
                        </ConfirmButton>
                    </div>
                )}

                {n !== 0 && (
                    <div className="request-list">
                        {!loading && pendingData.length === 0 && (
                            <div className="admin-center">
                                <p className="no-request-text">申請が0件です</p>
                            </div>
                        )}
                        {!loading &&
                            pendingData.map((item) => (
                                <div className="request-card" key={item.id}>
                                    <SingleRequest item={item} setPendingData={setPendingData} />
                                </div>
                            ))
                        }
                        {loading && <CenterLoader />}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Admin;
