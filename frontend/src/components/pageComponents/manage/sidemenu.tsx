import { Link } from "react-router-dom";
import "./manage.css"

type Props={
    id:string | number | undefined;
}

const SideMenu=({id}:Props)=>{
    const env = process.env.REACT_APP_URL ?? ""

    return (
        <aside className="sidebar">
            <h3 className="sidebar-title">メニュー</h3>
            <Link to={`${env}/manage/${id}/editPage`}>ページを編集</Link>
            <Link to={`${env}/manage/${id}/editProfile`}>プロフィール編集</Link>
            <Link to={`${env}/circles/${id}`}>ページを閲覧</Link>
        </aside>
    )
}

export default SideMenu;