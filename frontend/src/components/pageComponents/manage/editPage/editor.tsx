import useEditor from "../../../../hooks/useEditor";
import Toolbar from "./toolbar";
import TypeSelecter from "./typeSelecter";

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
        handleUnderline,
        setType
    } = useEditor()

    return (
        <div className="editor">
            {blocks.map((block, i) => {

                return (
                    <div className="flex items-center"
                        onFocus={() => handleOnFocus(i)}
                        onBlur={() => handleOnBlur(i)}
                    >
                        {isFocused[i] && <TypeSelecter />}
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
                            onKeyDown={(e) => handleKeyDown(e, block, i)}
                            data-placeholder={isFocused[i] ? "ここに入力してください" : ""}
                        />
                    </div>
            )})}
            <Toolbar handleBold={handleBold} handleUnderline={handleUnderline} />
        </div>
    )
}

export default Editor;