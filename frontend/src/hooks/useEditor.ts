import { useEffect, useRef, useState } from "react";
import { getCaretPosition, getSelectionRangeInElement, setCaretPosition } from "../libs/caretHelper";
import { Block } from "../types/block";
import { parseHtmlToRichTexts, richTextsToHtml } from "../libs/richTextHelper";
import { applyBoldToSelection, applyUnderlineToSelection, getSelectedBlockIndex } from "../libs/decorationHelper";
import { handleBackSpaceKey, handleEnterKey } from "../libs/keyboardOperation";

const useEditor=()=>{
    const initBlock:Block = {
        plainText:"",
        richTexts:[{text:"",decoration:{bold:false,underline:false},href:null}],
        // type:"paragraph"
    }

    const [isFocused, setIsFocused] = useState<boolean[]>([true]);
    const [blocks,setBlocks] = useState<Block[]>([initBlock])
    const inputRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [isComposing, setIsComposing] = useState(false);

    const handleBold=()=>{
        const index = getSelectedBlockIndex(inputRefs.current);
        if (index === null) return;
        const applyed = applyBoldToSelection(inputRefs.current[index]!,blocks,index);
        if(applyed){
            setBlocks(prev =>
                prev.map((b, i) =>
                  i === index ? { plainText: applyed.plainText, richTexts: applyed.richTexts } : b
                )
            );
        }
    }

    const handleUnderline=()=>{
        const index = getSelectedBlockIndex(inputRefs.current);
        if (index === null) return;
        const applyed = applyUnderlineToSelection(inputRefs.current[index]!,blocks,index);
        if(applyed){
            setBlocks(prev =>
                prev.map((b, i) =>
                  i === index ? { plainText: applyed.plainText, richTexts: applyed.richTexts } : b
                )
            );
        }
    }

    useEffect(() => {
        blocks.forEach((text, i) => {
          const el = inputRefs.current[i];
          const html = richTextsToHtml(text.richTexts) 
          if(el && el.innerHTML !== html){
            el.innerHTML =  html;
          }
        });
      }, [blocks]);
      

    function swapArrayElements<T>(array: T[], i: number, value:T): T[] {
        const newArray = [...array]; 
        newArray[i] = value;
        return newArray;
    }

    function addElements<T>(array: T[], i: number, value: T): T[] {
        if (i <= 0) {
          return [value, ...array];
        } else if (i >= array.length) {
          return [...array, value];
        } else {
          return [...array.slice(0, i), value, ...array.slice(i)];
        }
    }

    function removeElement<T>(array:T[],i:number):T[]{
        const newArray = array.filter((_,index)=>index!==i)
        return newArray
    }

    const handleOnInput=(html:string,i:number)=>{
        const newRichTexts = parseHtmlToRichTexts(html);
        const newPlain = newRichTexts.map(rt => rt.text).join("");
        setBlocks((prev) =>
            prev.map((b, index) => index === i ? { plainText: newPlain, richTexts: newRichTexts } : b)
        );
    }

    const handleOnFocus=(i:number)=>{
        setIsFocused((prev)=>swapArrayElements(prev,i,true))
    }

    const handleOnBlur=(i:number)=>{
        setIsFocused((prev)=>swapArrayElements(prev,i,false))
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, block: Block, i: number) => {
        const plainText = block.plainText;
    
        if (e.key === "ArrowRight") {
            const caretPosition = getCaretPosition(inputRefs.current[i]!);
            if (inputRefs.current[i + 1] && caretPosition === plainText.length) {
                e.preventDefault();
                inputRefs.current[i + 1]?.focus();
                setCaretPosition(inputRefs.current[i + 1]!, 0);
            }
        } else if (e.key === "ArrowLeft") {
            const caretPosition = getCaretPosition(inputRefs.current[i]!);
            if (inputRefs.current[i - 1] && caretPosition === 0) {
                e.preventDefault();
                inputRefs.current[i - 1]?.focus();
                setCaretPosition(inputRefs.current[i - 1]!, blocks[i - 1].plainText.length);
            }
        } else if (e.key === "ArrowDown") {
            if (inputRefs.current[i + 1]) {
                e.preventDefault();
                inputRefs.current[i + 1]?.focus();
            }
        } else if (e.key === "ArrowUp") {
            if (inputRefs.current[i - 1]) {
                e.preventDefault();
                inputRefs.current[i - 1]?.focus();
            }
        } else if (e.key === "Enter") {
            if (isComposing) return;
            const {newLeftBlock,newRightBlock} = handleEnterKey(e,block,inputRefs.current[i])
            setBlocks((prev) => {
                const withoutCurrent = swapArrayElements(prev, i, newLeftBlock);
                return addElements(withoutCurrent, i + 1, newRightBlock);
            });
            setIsFocused((prev) => addElements(prev, i + 1, false));
            setTimeout(() => {
                inputRefs.current[i + 1]?.focus();
                setCaretPosition(inputRefs.current[i + 1]!, 0);
            }, 0);
        } else if (e.key === "Backspace") {
            const caretPosition = getCaretPosition(inputRefs.current[i]!);
            const { start, end } = getSelectionRangeInElement(inputRefs.current[i]!);
        
            if (start === end && caretPosition === 0 && i > 0) {
                const {newBlock,prevBlock} = handleBackSpaceKey(e,blocks,i);
        
                setBlocks((prev) => {
                    const newBlocks = [...prev];
                    newBlocks.splice(i - 1, 2, newBlock); // prev + current を1つに
                    return newBlocks;
                });
                setIsFocused((prev) => removeElement(prev, i));
        
                setTimeout(() => {
                    inputRefs.current[i - 1]?.focus();
                    setCaretPosition(inputRefs.current[i - 1]!, prevBlock.plainText.length);
                }, 0.01);
            }
        }
    };
    

    return {
        handleOnInput,
        handleOnFocus,
        handleOnBlur,
        handleKeyDown,
        isFocused,
        blocks,
        inputRefs,
        setBlocks,
        handleBold,
        setIsComposing,
        handleUnderline
    }
}

export default useEditor;