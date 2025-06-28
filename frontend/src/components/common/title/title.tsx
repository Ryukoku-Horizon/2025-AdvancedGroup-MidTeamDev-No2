type Props={
    text:string;
}

const Title=({text}:Props)=>{
    return (
        <h1 className="font-4xl">{text}</h1>
    )
}

export default Title