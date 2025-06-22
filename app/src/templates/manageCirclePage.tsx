import * as React from "react";
import Layout from "../components/Layout/Layout";
import { convertCircleData } from "../libs/convertPendingData";
import useFirebaseUser from "../hooks/useFirebase";
import { Link, navigate } from "gatsby"
import { ClipLoader } from "react-spinners";

const Admin = ({ pageContext }) => {
    const circlData = pageContext.item;
    const convered = convertCircleData(circlData)
    const {user,loading,logout} = useFirebaseUser()

    React.useEffect(()=>{
        if(!user && !loading){
            navigate("/")
        }
    },[user])

    return (
        <Layout>
            {user && <div>
                <button onClick={()=>{logout()}}>ログアウト</button>
                <Link to={`/manage/${convered.id}/edit`}>ページを編集する</Link>
                <Link to={`/manage`}>プロフィールを編集する</Link>
                <Link to={`/`}>ページを閲覧する</Link>
                <p>{convered.name}</p>
                <p>基本情報</p>
                <p>活動内容：{convered.detail}</p>
                <div className="flex gap-2">
                    <p>活動キャンパス</p>
                    {convered.location.map((item)=>(
                        <p>{item}</p>
                    ))}
                </div>
                <div>
                    {convered.activeDate.type==="毎週" && <p>
                        {typeof convered.activeDate.data!=="string" && convered.activeDate.data.week.map((item)=>(<span>{item}</span>))}
                    </p>}
                </div>
            </div>}
            {!user && loading && 
            <div className="items-center justify-center">
                <ClipLoader size={100} />
            </div>}
        </Layout>
    );
};

export default Admin;
