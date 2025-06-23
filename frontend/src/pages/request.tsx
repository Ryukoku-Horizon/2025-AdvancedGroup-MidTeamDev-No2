import { useState } from "react";
import CampuseSelect from "../components/pageComponents/request/campuseSelect";
import WeekSelect from "../components/pageComponents/request/weekSelect/weekSelect";
import SelectTime from "../components/pageComponents/request/weekSelect/selectTime";
import useRequest from "../hooks/useRequest";
import {ClipLoader} from "react-spinners";
import Layout from "../components/Layout/Layout";
import SuccessCheck from "../components/common/checkmark/successCheck";
import EmailInput from "../components/pageComponents/request/emailInput";
import NameInput from "../components/pageComponents/request/nameInput";
import DetailInput from "../components/pageComponents/request/detailInput";
import DateTypeSelect from "../components/pageComponents/request/dateTypeSelect";
import TimeDetailInput from "../components/pageComponents/request/timeDetailInput";
import ConfirmButton from "../components/common/Btn/confirmBtn/confirmBtn";
import "../styles/requests.css"

const Request=()=>{
    const [mail,setMail] = useState("");
    const [name, setName] = useState("");
    const [detail,setDetail] = useState("");
    const [dateType,setDateType] = useState("weekly");
    const [selectedWeek,setSelectedWeek] = useState<string[]>([]);
    const [selectedCampuses, setSelectedCampuses] = useState<string[]>([]);
    const [selectedStartTime,setSelectedStartTime] = useState("");
    const [selectedEndTime,setSelectedEndTime] = useState("");
    const [timeDetail,setTimeDetail] = useState("");

    const {loading,loadingMessage,errMessage,request,success} = useRequest();

    const handleRequest=async()=>{
        console.log("aaa")
        if(mail!=="" && name!=="" && detail!=="" && selectedCampuses.length!==0){
            if((dateType==="weekly" && selectedWeek.length!==0) || (dateType!=="weekly" && timeDetail!=="")){
                const date =  {type:dateType,data:dateType==="weekly" ? {week:selectedWeek,start:selectedStartTime,end:selectedEndTime} : timeDetail}
                await request(mail,name,JSON.stringify(selectedCampuses),JSON.stringify(date),detail)
            }
        }
    }

    return (
        <Layout>
             <div className="form-wrapper">
                <div className="form-card">
                    <h1 className="form-title">申請フォーム</h1>
                    <EmailInput email={mail} setEmail={setMail} />
                    <NameInput name={name} setName={setName} />
                    <DetailInput detail={detail} setDetail={setDetail} />
                    <DateTypeSelect dateType={dateType} setDateType={setDateType} />
                    {dateType==="weekly" && <WeekSelect selectedWeek={selectedWeek} setSelectedWeek={setSelectedWeek} />}
                    {dateType==="weekly" && <SelectTime 
                        selectedStartTime={selectedStartTime} 
                        setSelectedStartTime={setSelectedStartTime} 
                        selectedEndTime={selectedEndTime} 
                        setSelectedEndTime={setSelectedEndTime} />}
                    {dateType!=="weekly" && <TimeDetailInput timeDetail={timeDetail} setTimeDetail={setTimeDetail} dateType={dateType} />}
                    <CampuseSelect setSelectedCampuses={setSelectedCampuses} selectedCampuses={selectedCampuses} />
                    {!loading && !success && <ConfirmButton  onClick={async () => { await handleRequest(); } }>
                        申請する
                    </ConfirmButton>}
                    {loading && !success && <ClipLoader color="#36d7b7" size={50}  />}
                    {success && <SuccessCheck size={50} />}
                    {errMessage!=="" && <p>{errMessage}</p>}
                    {loadingMessage!=="" && <p>{loadingMessage}</p>}
                </div>
            </div>
        </Layout>
    )
}

export default Request;