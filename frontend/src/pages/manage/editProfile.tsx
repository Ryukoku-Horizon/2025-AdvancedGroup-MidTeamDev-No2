import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import useFirebaseUser from "../../hooks/useFirebase";
import { useEffect } from "react";
import useSingleCircleData from "../../hooks/useSingleCircle";

const EditProfile=()=>{
    const { id } = useParams();
    const {user,loading,logout} = useFirebaseUser();
    const {circleData,loading:loadData} = useSingleCircleData(id)
    const navigate = useNavigate()

    useEffect(()=>{
        if(!user && !loading){
            navigate("/")
        }
    },[user])

    return (
        <Layout>
            <div>
                
            </div>
        </Layout>
    )
}

export default EditProfile;