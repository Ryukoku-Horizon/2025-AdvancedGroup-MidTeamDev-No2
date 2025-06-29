import useEditor from "../../../../hooks/useEditor";
import Toolbar from "./toolbar";
import TypeSelecter from "./typeSelecter";
import "./editor.css"
import { useState } from "react";
import { blockTypes } from "../../../../constants/blockTypes";
import { Block } from "../../../../types/block";

type Props={
    blocks:Block[];
    setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
}

const Editor=({blocks,setBlocks}:Props)=>{
    const {
        handleOnInput,
        handleOnFocus,
        handleOnBlur,
        handleKeyDown,
        isFocused,
        inputRefs,
        handleBold,
        setIsComposing,
        handleUnderline,
        setType,
        hoverIndex,
        setHoverIndex,
        addNewBlock,
        crrBlock
    } = useEditor(blocks,setBlocks);
    const [selectorIndex, setSelectorIndex] = useState<number | null>(null);

    return (
        <div className="editor">
            {blocks.map((block, i) => {

                return (
                    <div className="flex items-center"
                        key={i}
                        onMouseEnter={()=>{setHoverIndex(i)}}
                        onMouseLeave={()=>{if(hoverIndex===i)setHoverIndex(null)}}
                    >
                        <TypeSelecter 
                            index={i} 
                            setType={setType} 
                            isHover={hoverIndex===i} 
                            addNewBlock={addNewBlock}
                            isEmpty={block.plainText===""}
                            setSelecterIndex={setSelectorIndex}
                            isOpen={selectorIndex===i}
                            />
                        <div
                            key={`${i}-input`}
                            ref={(el) => {
                            inputRefs.current[i] = el;
                            }}
                            contentEditable
                            suppressContentEditableWarning
                            className={`editor-block ${block.type}`}
                            onCompositionStart={() => setIsComposing(true)}
                            onCompositionEnd={() => setIsComposing(false)}
                            spellCheck={false}
                            onInput={(e) => {
                                const html = (e.target as HTMLDivElement).innerHTML;
                                handleOnInput(html,i)
                                }}
                            onKeyDown={(e) => handleKeyDown(e, block, i)}
                            data-placeholder={(isFocused[i] && block.type==="paragraph") ? "ここに入力してください" :
                            (block.type!=="paragraph") ? blockTypes.find((item)=>item.type===block.type)?.label : ""}
                            onFocus={()=>{handleOnFocus(i)}}
                            onBlur={()=>{handleOnBlur(i)}}
                        />
                    </div>
            )})}
            <Toolbar 
            handleBold={handleBold} 
            handleUnderline={handleUnderline} 
            setType={setType}
            type={crrBlock?.type}
            />
        </div>
    )
}

export default Editor;