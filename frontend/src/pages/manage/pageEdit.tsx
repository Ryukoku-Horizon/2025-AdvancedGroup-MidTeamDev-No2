import { useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout"
import useFirebaseUser from "../../hooks/useFirebase";
import useEditor from "../../hooks/useEditor";

const EditPage=()=>{
    const { id } = useParams();
    const {user,loading,logout} = useFirebaseUser();
    const {handleChange,handleKeyDown,handleOnBlur,handleOnFocus,isFocused,blocks,inputRefs} = useEditor()

    return (
        <Layout>
            <div className="manage-container">
                <div className="main-content">
                    <section className="circle-info">
                    {blocks.map((block, i) => (
                        <div
                            key={i}
                            ref={(el) => {
                            inputRefs.current[i] = el;
                            }}
                            contentEditable
                            suppressContentEditableWarning
                            className="editor-block"
                            onInput={(e) => handleChange((e.target as HTMLDivElement).innerText, i)}
                            onFocus={() => handleOnFocus(i)}
                            onBlur={() => handleOnBlur(i)}
                            onKeyDown={(e) => handleKeyDown(e, block, i)}
                            data-placeholder={isFocused[i] ? "ここに入力してください" : ""}
                        >
                            {block}
                        </div>
                        ))}
                    </section>
                </div>
            </div>
        </Layout>
    )
}

export default EditPage;