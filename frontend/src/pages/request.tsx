import Layout from "../components/Layout/Layout";
import RequestForm from "../components/pageComponents/request/requestForm";
import "../styles/requests.css"

const Request=()=>{
    return (
        <Layout>
             <div className="form-wrapper">
                <div className="form-card">
                    <h1 className="form-title">申請フォーム</h1>
                    <RequestForm />
                </div>
            </div>
        </Layout>
    )
}

export default Request;