type Props={
    text:string;
    className?:string;
}

const Title=({text,className}:Props)=>{
    return (
        <p className={`font-7xl bold ${className}`}>{text}</p>
    )
}

export default Title