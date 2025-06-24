import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";

const AIsearch=()=>{
    return (
        <Layout>
            <div className="center-posi text-center font-xl p-6 border radius-md pt-1 box-shadow">
                <h2>AIサークル診断へようこそ！</h2>
                <img src="https://dummyimage.com/600x400/000/fff" alt="検索欄" />
                <label htmlFor="" className="flex">
                    <input className="w-90p radius-none-right p-1 border" id="text" placeholder="Search for club..."/>
                    <button type="submit" className="w-10p radisu-none-left border-width-none p-1 background-blue white">送信</button>
                </label>
            </div>
        </Layout>
    )
}

export default AIsearch;