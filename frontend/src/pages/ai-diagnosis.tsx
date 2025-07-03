import "../styles/ai-diagnosis.css";
import Layout from "../components/Layout/Layout";
import { useState } from "react";
import InitScreen from "../components/pageComponents/ai-diagnosis/initScreen";
import PageTitle from "../components/pageComponents/ai-diagnosis/pageTitle";
import ChatField from "../components/pageComponents/ai-diagnosis/chatField";

const AIDiagnosis = () => {
    const [isStarted,setIsStarted] = useState(false);

    const start=()=>{
        setIsStarted(true)
    }

    return (
        <Layout>
            <div className="flex justify-center h-90p w-full">
                <div className="diagnosis-container flex flex-col items-center my-2 px-2 pb-8 w-90p">
                    <PageTitle isStarted={isStarted} />
                    <InitScreen start={start} isStarted={isStarted} />
                    <ChatField isStarted={isStarted} />
                </div>
            </div>
        </Layout>
    );
};

export default AIDiagnosis;
