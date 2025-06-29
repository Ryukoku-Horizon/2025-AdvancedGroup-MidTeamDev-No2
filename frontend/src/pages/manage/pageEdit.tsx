import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout"
import TopBar from "../../components/pageComponents/manage/topbar";
import useSingleCircleData from "../../hooks/useSingleCircle";
import Editor from "../../components/pageComponents/manage/editPage/editor";
import Title from "../../components/common/title/title";
import CenterLoader from "../../components/common/loader/centerLoader";
import { useState } from "react";
import { Block } from "../../types/block";
import useSavePageData from "../../hooks/useSavePageData";
import { ClipLoader } from "react-spinners";
import SuccessCheck from "../../components/common/checkmark/successCheck";

const EditPage=()=>{
    const { id } = useParams();
    const {circleData,loading:dataLoad} = useSingleCircleData(id)
    const { success, loading, errMessage, save } = useSavePageData(id);
    const navigate = useNavigate();
    const initBlock:Block = {
        plainText:"",
        richTexts:[{text:"",decoration:{bold:false,underline:false,color:"black"}}],
        type:"paragraph"
    }
    const [blocks, setBlocks] = useState<Block[]>([initBlock]);

    return (
        <Layout>
            <div className="manage-container">
                {!loading && !success && <TopBar back={()=>{navigate(`/manage/${id}`)}} save={()=>{save(blocks,id)}} />}
                {errMessage!=="" && <p>{errMessage}</p>}
                {loading && !success && <ClipLoader color="#36d7b7" size={50}  />}
                {success && <SuccessCheck size={50} />}
                <div className="main-content">
                    {!dataLoad && circleData && <section className="circle-info">
                        <Title text={circleData.name} />
                        <Editor blocks={blocks} setBlocks={setBlocks} />
                    </section>}
                    {dataLoad && <CenterLoader />}
                </div>
            </div>
        </Layout>
    )
}

export default EditPage;