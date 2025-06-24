import { Link } from "react-router-dom";
import "./manage.css"

type Props={
    id:string | number | undefined;
}

const SideMenu=({id}:Props)=>{
    return (
        <aside className="sidebar">
            <h3 className="sidebar-title">メニュー</h3>
            <Link to={`/manage/${id}/edit`}>ページを編集</Link>
            <Link to={`/manage/${id}/editProfile`}>プロフィール編集</Link>
            <Link to={`/`}>ページを閲覧</Link>
        </aside>
    )
}

export default SideMenu;