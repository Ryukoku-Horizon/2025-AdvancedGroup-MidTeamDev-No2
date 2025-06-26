export type Block={
    plainText:string;
    richTexts:RichText[];
}

export type RichText={
    text:string;
    decoration:Decoration;
    href:string | null;
}

type Decoration={
    bold:boolean;
    underline:boolean;
    h1:boolean;
    h2:boolean;
    h3:boolean;
}