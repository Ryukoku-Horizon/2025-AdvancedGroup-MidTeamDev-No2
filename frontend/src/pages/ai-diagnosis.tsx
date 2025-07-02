import "../styles/ai-diagnosis.css";
import Layout from "../components/Layout/Layout";
import { useState } from "react";
import InitScreen from "../components/pageComponents/ai-diagnosis/initScreen";
import PageTitle from "../components/pageComponents/ai-diagnosis/pageTitle";

const AIDiagnosis = () => {
    const [isStarted,setIsStarted] = useState(false)

    const start=()=>{
        setIsStarted(true)
    }

    return (
        <Layout>
            <div className="flex justify-center h-90p w-full">
                <div className="diagnosis-container flex flex-col items-center my-2 px-8 pb-8">
                    <PageTitle isStarted={isStarted} />
                    <InitScreen start={start} isStarted={isStarted} />
                </div>
            </div>
        </Layout>
    );
};

export default AIDiagnosis;
