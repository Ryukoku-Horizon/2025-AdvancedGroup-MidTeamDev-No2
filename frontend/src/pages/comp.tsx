import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";

const Comp=()=>{
    return (
        <Layout>
            <div className="h-full w-full flex-col radius-s background-gray p-3 text-center w-half flex-col justify-content align-items ">
                <img className="w-9 h-9" src="/ok-img.png" alt="申請完了" />
                <p className="font-x bold">申請しました</p>
                <p className="font-md">管理者による承認をお待ちください<br />後日メールでお知らせします</p>
                <Link to="/" className="radius-md background-blue white p-1 font-l">ホームに戻る</Link>
            </div>
        </Layout>
    )
}

export default Comp;