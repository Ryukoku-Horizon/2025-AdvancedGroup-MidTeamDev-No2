import * as React from "react";
import usePendingData from "../../hooks/usePendingData";
import SingleRequest from "../../components/pageComponents/admin/singleRequest";
import Layout from "../../components/Layout/Layout";
import { ClipLoader } from "react-spinners";
import ConfirmButton from "../../components/common/Btn/confirmBtn/confirmBtn";

const Admin = () => {
    const {pendingData,loading,setN,n} = usePendingData()

    return (
        <Layout>
            <div>
                <p>Admin</p>
                <p>申請一覧</p>
                {n===0 && <div>
                    <ConfirmButton onClick={()=>{setN(1)}}>
                        申請を読み込む
                    </ConfirmButton>
                </div>}
                {n===1 && <div className="flex flex-col gap-2">
                    {!loading && pendingData.length===0 && <div>
                        <p>申請が0件です</p>
                    </div>}
                    {!loading && pendingData.map((item) => {
                        return (
                            <SingleRequest key={item.id} item={item} />
                    )})}
                    {loading && 
                        <div className="flex items-center">
                            <ClipLoader color="#36d7b7" size={50}  />
                        </div>
                        }
                </div>}
            </div>
        </Layout>
    );
};

export default Admin;