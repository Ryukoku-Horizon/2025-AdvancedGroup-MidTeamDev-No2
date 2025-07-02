type Props={
    text:string;
    className?:string;
}

const Title=({text,className}:Props)=>{
    return (
        <p className={`font-6xl bold gray-6 ${className}`}>{text}</p>
    )
}

export default Title