import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";

const Search=()=>{
    return (
        <Layout>
            <div>
                <div className="center-posi text-center font-xl">
                    <h2>検索</h2>
                    <h2 className="gray-2 font-2xl">気になるサークルを簡単検索</h2>
                    <form>
                        <table >            
                            <tr>
                                
                                <td>
                                    <input className="w-full radius-md" id="text" />
                                </td>
                            </tr>
                        </table>
                    </form>
                </div>
                <Link to="/" pt-3 m-3>home</Link>
            </div>
        </Layout>
    )
}

export default Search;