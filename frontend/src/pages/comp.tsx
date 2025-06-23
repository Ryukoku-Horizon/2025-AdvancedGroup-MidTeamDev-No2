import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";

const Comp=()=>{
    return (
        <Layout>
            <div className="flex-col radius-s bg-gray-1 p-3 text-center w-65p center-posi">
                <img className="w-18" src="/ok-img.png" alt="申請完了" />
                <p className="font-50 bold m-0">申請しました!</p>
                <p className="font-md pb-2">管理者による承認をお待ちください。<br />後日メールでお知らせします。</p>
                <Link to="/" className="radius-md background-blue white p-1 font-l">ホームに戻る</Link>
            </div>
        </Layout>
    )
}

export default Comp;