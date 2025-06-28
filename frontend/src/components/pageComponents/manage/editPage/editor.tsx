import useEditor from "../../../../hooks/useEditor";
import Toolbar from "./toolbar";

const Editor=()=>{
    const {
        handleOnInput,
        handleOnFocus,
        handleOnBlur,
        handleKeyDown,
        isFocused,
        blocks,
        inputRefs,
        handleBold,
        setIsComposing,
        handleUnderline
    } = useEditor()

    return (
        <div className="editor">
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
            <Toolbar handleBold={handleBold} handleUnderline={handleUnderline} />
        </div>
    )
}

export default Editor;