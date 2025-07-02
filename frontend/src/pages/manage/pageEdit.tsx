import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout"
import TopBar from "../../components/pageComponents/manage/topbar";
import useSingleCircleData from "../../hooks/useSingleCircle";
import Editor from "../../components/pageComponents/manage/editPage/editor";
import Title from "../../components/common/title/title";
import CenterLoader from "../../components/common/loader/centerLoader";
import { useEffect, useState } from "react";
import { Block } from "../../types/block";
import useSavePageData from "../../hooks/useSavePageData";
import { ClipLoader } from "react-spinners";
import SuccessCheck from "../../components/common/checkmark/successCheck";
import usePageData from "../../hooks/usePageData";

const EditPage=()=>{
    const { id } = useParams();
    const {circleData,loading:dataLoad} = useSingleCircleData(id)
    const { success, loading, errMessage, save } = useSavePageData(id);
    const {pageData,loading:pageLoad} = usePageData(id)
    const navigate = useNavigate();
    const initBlock:Block = {
        plainText:"",
        richTexts:[{text:"",decoration:{bold:false,underline:false,color:"black"}}],
        type:"paragraph"
    }
    const [blocks, setBlocks] = useState<Block[]>([initBlock]);

    useEffect(()=>{
        if(pageData.length!==0){
            setBlocks(pageData)
        }
    },[pageData])

    return (
        <Layout>
            <div className="manage-container">
                {!loading && !success && <TopBar back={()=>{navigate(`/manage/${id}`)}} save={()=>{save(blocks,id)}} />}
                {errMessage!=="" && <p>{errMessage}</p>}
                {loading && !success && <ClipLoader color="#36d7b7" size={50}  />}
                {success && <SuccessCheck size={50} />}
                <div className="main-content relative flex justify-center items-center">
                    {!dataLoad && circleData && <section className="circle-info relative" style={{maxWidth:"650px"}}>
                        <Title text={circleData.name} className={circleData.image!=="" ? "relative l-2 m-0" : "m-0 relative l-3"} />
                        {circleData.image!==""&& <img src={circleData.image} className="circle-cover" />}
                        {circleData.image===""&& <div className={circleData.image!=="" ? "border-b h-1 border-gray-2 my-2" : "border-b h-1 border-gray-2 m-0"} />}
                        <Editor blocks={blocks} setBlocks={setBlocks} />
                    </section>}
                    {(dataLoad || pageLoad) && <CenterLoader />}
                </div>
            </div>
        </Layout>
    )
}

export default EditPage;