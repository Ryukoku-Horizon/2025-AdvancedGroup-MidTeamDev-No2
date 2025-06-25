export type Block={
    plainText:string;
    chars:{
        char:{
            text:string;
            decoration:{
                bold:boolean;
                underline:boolean;
                italic:boolean;
            },
            href:string;
        }[]
    }
}