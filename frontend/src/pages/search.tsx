import { useState } from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";
import PageTitle from "../components/pageComponents/search/pageTitle";
import SearchField from "../components/pageComponents/search/searchField";

const Search=()=>{
    const [startLoad,setStartLoad] = useState(false)

    return (
        <Layout>
            <Link to="/" className="login-link ml-2 mt-1">← ホームページへ</Link>
            <div className="flex flex-col items-center justify-center w-full">
                <PageTitle startLoad={startLoad} />
                <SearchField startLoad={startLoad} setStartLoad={setStartLoad} />
            </div>
        </Layout>
    )
}

export default Search;