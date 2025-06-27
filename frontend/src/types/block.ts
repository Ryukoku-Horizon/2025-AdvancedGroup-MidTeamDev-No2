export type Block={
    plainText:string;
    richTexts:RichText[];
    // type:Type;
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

type Type="paragraph" | "header1" | "header2" | "header3"