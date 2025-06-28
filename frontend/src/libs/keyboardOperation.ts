import { Block } from "../types/block";
import { getCaretPosition } from "./caretHelper";
import { mergeRichTexts, splitRichTextsAtPosition } from "./richTextHelper";

export const handleEnterKey=(e:React.KeyboardEvent<HTMLDivElement>,block:Block,inputRefs: HTMLDivElement | null)=>{
    e.preventDefault();
    const caretPosition = getCaretPosition(inputRefs!);
    const { richTexts } = block;

    const [leftRichTexts, rightRichTexts] = splitRichTextsAtPosition(richTexts,caretPosition)

    const newLeftBlock: Block = {
        plainText: leftRichTexts.map(rt => rt.text).join(""),
        richTexts: leftRichTexts,
        type:block.type
    };
    const newRightBlock: Block = {
        plainText: rightRichTexts.map(rt => rt.text).join(""),
        richTexts: rightRichTexts,
        type:"paragraph"
    };
    return {newLeftBlock,newRightBlock}
}

export const handleBackSpaceKey=(e:React.KeyboardEvent<HTMLDivElement>,blocks:Block[],i:number)=>{
    e.preventDefault();
    const prevBlock = blocks[i - 1];
    const currentBlock = blocks[i];

    const mergedRichTexts = mergeRichTexts(prevBlock.richTexts, currentBlock.richTexts);
    const mergedPlainText = mergedRichTexts.map(rt => rt.text).join("");

    const newBlock: Block = {
        plainText: mergedPlainText,
        richTexts: mergedRichTexts,
        type:blocks[i - 1].type
    };
    return {newBlock,prevBlock};
}