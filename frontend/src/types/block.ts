export type Block={
    plainText:string;
    richTexts:RichText[];
    type:Type;
}

export type RichText={
    text:string;
    decoration:Decoration;
    href:string | null;
}

export type Decoration={
    bold:boolean;
    underline:boolean;
}

export type Type="paragraph" | "heading1" | "heading2" | "heading3"