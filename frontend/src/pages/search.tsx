import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";

const Search=()=>{
    return (
        <Layout>
            <div className="center-posi text-center font-xl">
                <h2>検索</h2>
                <h2 className="gray-2 font-2xl">気になるサークルを簡単検索</h2>
                <input className="w-full radius-md p-1 border" id="text" placeholder="Search for club..."/>
            </div>
        </Layout>
    )
}

export default Search;