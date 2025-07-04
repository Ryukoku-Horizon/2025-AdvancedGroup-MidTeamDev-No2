import {  useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import ConfirmButton from "../components/common/Btn/confirmBtn/confirmBtn";

const Comp=()=>{
    const navigate = useNavigate()
    const env = process.env.REACT_APP_URL ?? ""

    return (
        <Layout>
            <div className="h-full w-full bg-gray-0.5 flex flex-col items-center py-8">
                <div className="flex-col radius-s bg-white p-8 flex items-center">
                    <img className="w-12" src="/ok-img.png" alt="申請完了" />
                    <p className="font-3xl bold m-0">申請が完了しました</p>
                    <p className="font-md pb-2">申請結果については後日メールでお知らせします。</p>
                    <ConfirmButton onClick={()=>{navigate(`${env}/`)}}>ホームに戻る</ConfirmButton>
                </div>
            </div>
        </Layout>
    )
}

export default Comp;