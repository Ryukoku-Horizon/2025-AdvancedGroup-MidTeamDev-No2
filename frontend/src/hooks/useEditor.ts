import { useRef, useState } from "react";

const useEditor=()=>{
    const [isFocused, setIsFocused] = useState<boolean[]>([true]);
    const [blocks,setBlocks] = useState<string[]>([""])
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

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

    const handleChange=(value:string,i:number)=>{
        setBlocks((prev)=> swapArrayElements(prev,i,value))
    }

    const handleOnFocus=(i:number)=>{
        setIsFocused((prev)=>swapArrayElements(prev,i,true))
    }

    const handleOnBlur=(i:number)=>{
        setIsFocused((prev)=>swapArrayElements(prev,i,false))
    }

    const handleKeyDown=(e: React.KeyboardEvent<HTMLInputElement>,block:string,i:number)=>{
        if(e.key==="ArrowRight"){
            
        }
        if(e.key==="ArrowDown"){
            if(inputRefs.current[i + 1]){
                inputRefs.current[i + 1]?.focus();
            }
        }
        if(e.key==="ArrowUp"){
            if(inputRefs.current[i - 1]){
                inputRefs.current[i - 1]?.focus();
            }
        }
        if (e.key === "Enter") {
            const caretPosition = inputRefs.current[i]?.selectionStart ?? 0;
            if(caretPosition===block.length){
                setBlocks((prev) =>addElements(prev,i + 1,""));
                setIsFocused((prev) =>addElements(prev,i + 1,false));
                setTimeout(() => {
                    inputRefs.current[i + 1]?.focus();
                }, 0);
            }else{
                if(caretPosition===0){
                    setBlocks((prev) =>{
                        const newBlock = swapArrayElements(prev,i,"")
                        return addElements(newBlock,i + 1,block)
                    });
                    setIsFocused((prev) =>addElements(prev,i + 1,false));
                    setTimeout(() => {
                        inputRefs.current[i + 1]?.focus();
                        inputRefs.current[i + 1]?.setSelectionRange(0, 0);
                    }, 0);
                }else{
                    setBlocks((prev) =>{
                        const newBlock = swapArrayElements(prev,i,block.slice(0,caretPosition))
                        return addElements(newBlock,i + 1,block.slice(caretPosition,block.length))
                    });
                    setIsFocused((prev) =>addElements(prev,i + 1,false));
                    setTimeout(() => {
                        inputRefs.current[i + 1]?.focus();
                        inputRefs.current[i + 1]?.setSelectionRange(0, 0);
                    }, 0);
                }
            }
        }
      
        if (e.key === "Backspace") {
            const caretPosition = inputRefs.current[i]?.selectionStart ?? 0;
            const start = inputRefs.current[i]?.selectionStart;
            const end = inputRefs.current[i]?.selectionEnd;
            if (start===end && caretPosition === 0 && i > 0) {
                e.preventDefault(); // defaultのBackspace挙動を止める（必要に応じて）
                const temp = blocks[i - 1].length
                setBlocks((prev) => {
                    const newText = prev[i - 1] + prev[i];
                    const newBlocks = [...prev];
                    newBlocks.splice(i - 1, 2, newText);
                    return newBlocks;
                });
        
                setIsFocused((prev) => removeElement(prev, i));
                setTimeout(()=>{
                    inputRefs.current[i - 1]?.focus();
                    inputRefs.current[i - 1]?.setSelectionRange(temp, temp);
                }, 0.01);
          }
        }
    }

    return {handleChange,handleOnFocus,handleOnBlur,handleKeyDown,isFocused,blocks,inputRefs}
}

export default useEditor;