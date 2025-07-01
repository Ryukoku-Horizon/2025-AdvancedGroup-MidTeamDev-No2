import { useState } from "react";
import Layout from "../components/Layout/Layout";
import CommonSearchField from "../components/common/textField/commonSerchField";
import { Link } from "react-router-dom";

const Search=()=>{
    const [value,setValue] = useState("");

    return (
        <Layout>
            <Link to="/" className="login-link ml-2 mt-1">← ホームページへ</Link>
            <div className="flex flex-col items-center justify-center w-full">
                <div className="flex flex-col items-center justify-centers mt-6 pt-8">
                    <p className="font-xl bold mb-0">検索</p>
                    <p className="gray-2 font-2xl bold mt-0 mb-5">気になるサークルを簡単検索</p>
                </div>
                <CommonSearchField value={value} onChange={(e)=>setValue(e.target.value)} className="" />
            </div>
        </Layout>
    )
}

export default Search;