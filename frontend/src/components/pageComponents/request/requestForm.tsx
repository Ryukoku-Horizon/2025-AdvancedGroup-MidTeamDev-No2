import { ClipLoader } from "react-spinners";
import ConfirmButton from "../../common/Btn/confirmBtn/confirmBtn";
import CampuseSelect from "./campuseSelect";
import DateTypeSelect from "./dateTypeSelect";
import DetailInput from "./detailInput";
import EmailInput from "./emailInput";
import NameInput from "./nameInput";
import TimeDetailInput from "./timeDetailInput";
import SuccessCheck from "../../common/checkmark/successCheck";
import { useState } from "react";
import useRequest from "../../../hooks/useRequest";
import WeekSelect from "./weekSelect/weekSelect";
import SelectTime from "./weekSelect/selectTime";

const RequestForm=()=>{
    const [mail,setMail] = useState("");
    const [name, setName] = useState("");
    const [detail,setDetail] = useState("");
    const [dateType,setDateType] = useState("毎週");
    const [selectedWeek,setSelectedWeek] = useState<string[]>([]);
    const [selectedCampuses, setSelectedCampuses] = useState<string[]>([]);
    const [selectedStartTime,setSelectedStartTime] = useState("");
    const [selectedEndTime,setSelectedEndTime] = useState("");
    const [timeDetail,setTimeDetail] = useState("");

    const {loading,loadingMessage,errMessage,request,success} = useRequest();

    const handleRequest=async()=>{
        if(mail!=="" && name!=="" && detail!=="" && selectedCampuses.length!==0){
            if((dateType==="毎週" && selectedWeek.length!==0) || (dateType!=="毎週" && timeDetail!=="")){
                const date =  {type:dateType,data:dateType==="毎週" ? {week:selectedWeek,start:selectedStartTime,end:selectedEndTime} : timeDetail}
                await request(mail,name,JSON.stringify(selectedCampuses),JSON.stringify(date),detail)
            }
        }
    }

    return (
        <>
            <EmailInput email={mail} setEmail={setMail} />
            <NameInput name={name} setName={setName} />
            <DetailInput detail={detail} setDetail={setDetail} />
            <DateTypeSelect dateType={dateType} setDateType={setDateType} />
            {dateType==="毎週" && <WeekSelect selectedWeek={selectedWeek} setSelectedWeek={setSelectedWeek} />}
            {dateType==="毎週" && <SelectTime 
                selectedStartTime={selectedStartTime} 
                setSelectedStartTime={setSelectedStartTime} 
                selectedEndTime={selectedEndTime} 
                setSelectedEndTime={setSelectedEndTime} />}
            {dateType!=="毎週" && <TimeDetailInput timeDetail={timeDetail} setTimeDetail={setTimeDetail} dateType={dateType} />}
            <CampuseSelect setSelectedCampuses={setSelectedCampuses} selectedCampuses={selectedCampuses} />
            {!loading && !success && <ConfirmButton  onClick={async () => { await handleRequest(); } }>
                申請する
            </ConfirmButton>}
            {loading && !success && <ClipLoader color="#36d7b7" size={50}  />}
            {success && <SuccessCheck size={50} />}
            {errMessage!=="" && <p>{errMessage}</p>}
            {loadingMessage!=="" && <p>{loadingMessage}</p>}
        </>
    )
}

export default RequestForm;