import { useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout"
import useFirebaseUser from "../../hooks/useFirebase";
import useEditor from "../../hooks/useEditor";
import useDecorationMenu from "../../hooks/useDecorationMenu";

const EditPage=()=>{
    const { id } = useParams();
    const {user,loading,logout} = useFirebaseUser();
    const {
        handleOnInput,
        handleKeyDown,
        handleOnBlur,
        handleOnFocus,
        isFocused,
        blocks,
        inputRefs,
        handleBold,
        setIsComposing,
        handleUnderline
    } = useEditor()
    const {showToolbar,toolbarPosition} = useDecorationMenu()

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
                            onCompositionStart={() => setIsComposing(true)}
                            onCompositionEnd={() => setIsComposing(false)}
                            spellCheck={false}
                              onInput={(e) => {
                                const html = (e.target as HTMLDivElement).innerHTML;
                                handleOnInput(html,i)
                                }}
                            onFocus={() => handleOnFocus(i)}
                            onBlur={() => handleOnBlur(i)}
                            onKeyDown={(e) => handleKeyDown(e, block, i)}
                            data-placeholder={isFocused[i] ? "ここに入力してください" : ""}
                        />
                        ))}
                    </section>
                </div>
            </div>
            {showToolbar && (
                <div
                    className="toolbar"
                    style={{
                    position: "absolute",
                    top: toolbarPosition.top,
                    left: toolbarPosition.left,
                    background: "white",
                    border: "1px solid #ccc",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    zIndex: 1000
                    }}
                >
                    <button onClick={()=>handleBold()}>太字</button>
                    <button onClick={()=>handleUnderline()}>下線</button>
                    {/* 他の装飾ボタン */}
                </div>
                )}
        </Layout>
    )
}

export default EditPage;