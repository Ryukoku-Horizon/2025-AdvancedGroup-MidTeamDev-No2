// import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";

const AIDiagnosis=()=>{
    return (
        <Layout>
            <div className="relative flex flex-col items-center text-center p-6 border radius-md pt-1 box-shadow wh-75p center-posi">
                <h2 className="b-9" >AIサークル診断へようこそ！</h2>
                
                <div className="wh-75p ml-0 mr-auto text-center">
                    <div className="l-0 mb-2">
                        <div className="speechBubble">
                            こんにちは！
                        </div>
                    </div>
                    <div className="speechBubble-right">
                        <p>こんにちは。これは例です。</p>
                    </div>
                </div>
                <div className="absolute b-0 mb-2 max-w-600 w-90p">
                    <label htmlFor="" className="flex w-full">
                        <input className="w-90p radius-none-right p-1 border b-0" id="text" placeholder="Search for club..."/>
                        <button type="submit" className="w-10p radisu-none-left border-width-none p-1 background-blue white">送信</button>
                    </label>
                </div>
            </div>
        </Layout>
    )
}

export default AIDiagnosis;