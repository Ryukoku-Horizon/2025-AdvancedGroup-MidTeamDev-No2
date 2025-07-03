export type QnA = {
    id: string;
    a:string[];
    q:string;
    condition?: (answers: Record<string, string>) => boolean;
}