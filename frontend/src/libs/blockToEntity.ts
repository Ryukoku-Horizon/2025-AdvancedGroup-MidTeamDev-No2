import { Block, BlockEntity } from "../types/block";

export const blockToEntity=(block:Block,circleId:string):BlockEntity=>{
    const content = JSON.stringify({plainText:block.plainText,richTexts:block.richTexts})

    return {
        type:block.type,
        content,
        circleId
    }
}