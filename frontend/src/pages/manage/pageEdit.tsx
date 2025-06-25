import { useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout"
import SideMenu from "../../components/pageComponents/manage/sidemenu";
import TopBar from "../../components/pageComponents/manage/topbar";
import useFirebaseUser from "../../hooks/useFirebase";
import MainScreen from "../../components/pageComponents/manage/mainScreen";
import { useRef, useState } from "react";
import useEditor from "../../hooks/useEditor";

const EditPage=()=>{
    const { id } = useParams();
    const {user,loading,logout} = useFirebaseUser();
    const {handleChange,handleKeyDown,handleOnBlur,handleOnFocus,isFocused,blocks,inputRefs} = useEditor()

    return (
        <Layout>
            <div className="manage-container">
                <div className="main-content">
                    <MainScreen>
                        {blocks.map((block,i)=>(
                            <input
                                ref={(el)=>{inputRefs.current[i]=el}}
                                value={block}
                                onChange={(e)=>{handleChange(e.target.value,i)}}
                                placeholder={isFocused[i] ? "ここに入力してください" : ""}
                                onFocus={() =>handleOnFocus(i)}
                                onBlur={() =>handleOnBlur(i)}
                                onKeyDown={(e) => {
                                    handleKeyDown(e,block,i)
                                  }}                                  
                                />
                        ))}
                    </MainScreen>
                </div>
            </div>
        </Layout>
    )
}

export default EditPage;