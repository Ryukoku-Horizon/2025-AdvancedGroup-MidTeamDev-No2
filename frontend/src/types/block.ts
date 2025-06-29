export type Block={
    plainText:string;
    richTexts:RichText[];
    type:Type;
}

export type RichText={
    text:string;
    decoration:Decoration;
}

export type Decoration={
    bold:boolean;
    underline:boolean;
    color:Color;
}

export type Type="paragraph" | "heading1" | "heading2" | "heading3";
export type Color="black" | "gray" | "red" | "blue" | "yellow" | "skyblue" | "brown" | "pink"

export type BlockEntity={
    id?:number;
    type:Type;
    content: string;
    circleId:string | number;
}