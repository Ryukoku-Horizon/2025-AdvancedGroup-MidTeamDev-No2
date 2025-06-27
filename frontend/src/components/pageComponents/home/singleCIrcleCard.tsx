import { Link } from "react-router-dom";
import { Circle } from "../../../types/Circle";
import "./circleCard.css"

type Props={
    circleData:Circle;
}

const SingleCircleCard=({circleData}:Props)=>{
    return (
        <Link to={`/circles/${circleData.id}`}>
            <div className="card">
                <img src={circleData.image!=="" ? circleData.image : "no-image.png"} alt={`${circleData.name} の画像`} className="image" />
                <div className="content">
                    <h2 className="title">{circleData.name}</h2>
                    <p className="description">{circleData.detail}</p>
                </div>
            </div>
        </Link>
    );
}

export default SingleCircleCard