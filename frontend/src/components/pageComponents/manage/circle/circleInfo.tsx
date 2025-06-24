import { Link } from "react-router-dom";
import { Circle } from "../../../../types/Circle";
import "./manageCircle.css"

type Props={
    circleData:Circle;
}

const CircleInfo=({circleData}:Props)=>{
    return (
        <div>
            <div className="circle-cover-wrapper">
                {circleData.image==="" && 
                <span>カバー画像が選択されていません（
                    <Link to={`/manage/${circleData.id}/editProfile`} className="link">こちら</Link>
                    から選択できます）</span>}
                <img
                src={circleData.image!=="" ? circleData.image : "/no-image.png"}
                alt={`${circleData.name} のカバー画像`}
                className="circle-cover"
                />
            </div>
            <h2 className="circle-name">{circleData.name}</h2>
            <div className="circle-detail">
                <h4>基本情報</h4>
                <p>活動内容：{circleData.detail}</p>

                <div className="circle-location">
                <p>活動キャンパス：</p>
                <ul>
                    {circleData.location.map((item, index) => (
                    <li key={index}>{item}</li>
                    ))}
                </ul>
                </div>

                {circleData.activeDate.type === "毎週" && typeof circleData.activeDate.data !== "string" && (
                <p>
                    活動日：
                    {circleData.activeDate.data.week.map((item, index) => (
                    <span key={index}>{item} </span>
                    ))}
                </p>
                )}
            </div>
        </div>
    )
}

export default CircleInfo;