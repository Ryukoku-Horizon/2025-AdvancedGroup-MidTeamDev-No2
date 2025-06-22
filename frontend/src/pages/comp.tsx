import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";

const Comp=()=>{
    return (
        <Layout>
            <div>
                <p className="font-x">申請しました</p>
                <p className="font-md">後日メールでお知らせします</p>
                <Link to="/">ホームに戻る</Link>
            </div>
        </Layout>
    )
}

export default Comp;