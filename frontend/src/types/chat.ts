export type Chat={
    content:string | string[];
    speaker:"user" | "ai"
    type:"choice" | "text" | "input" | "loading"
}