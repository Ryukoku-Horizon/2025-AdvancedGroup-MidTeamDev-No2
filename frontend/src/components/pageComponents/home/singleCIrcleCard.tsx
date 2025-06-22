import { Circle } from "../../../types/Circle";
import "./circleCard.css"

type Props={
    circleData:Circle;
}

const SingleCircleCard=({circleData}:Props)=>{
    return (
        <div className="card">
            <img src={"/thum.png"} alt={`${circleData.name} の画像`} className="image" />
            <div className="content">
                <h2 className="title">{circleData.name}</h2>
                <p className="description">{circleData.detail}</p>
            </div>
        </div>
    );
}

export default SingleCircleCard