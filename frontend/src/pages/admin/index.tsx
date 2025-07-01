import usePendingData from "../../hooks/usePendingData";
import SingleRequest from "../../components/pageComponents/admin/singleRequest";
import Layout from "../../components/Layout/Layout";
import ConfirmButton from "../../components/common/Btn/confirmBtn/confirmBtn";
import CenterLoader from "../../components/common/loader/centerLoader";

const Admin = () => {
    const {pendingData,loading,setN,n,setPendingData} = usePendingData()

    return (
        <Layout>
            <div>
                <p>申請一覧</p>
                {n===0 && <div>
                    <ConfirmButton onClick={()=>{setN(1)}}>
                        申請を読み込む
                    </ConfirmButton>
                </div>}
                {n!==0 && <div className="flex flex-col gap-2">
                    {!loading && pendingData.length===0 && <div>
                        <p>申請が0件です</p>
                    </div>}
                    {!loading && pendingData.map((item) => {
                        return (
                            <SingleRequest key={item.id} item={item}setPendingData={setPendingData} />
                    )})}
                    {loading && 
                        <CenterLoader />
                        }
                </div>}
            </div>
        </Layout>
    );
};

export default Admin;