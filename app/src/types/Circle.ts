export type Circle={
    id:number | string;
    email:string;
    name:string;
    location:string[];
    activeDate:ActiveDate;
    detail:string;
}

type ActiveDate={
    type: string;
    data: {
        week:string[];
        start:string;
        end:string;
    } | string;
}

export type StringfyCircle={
    id:number | string;
    email:string;
    name:string;
    location:string;
    activeDate:string;
    detail:string;
}