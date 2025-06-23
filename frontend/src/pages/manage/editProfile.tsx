import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import useFirebaseUser from "../../hooks/useFirebase";
import { useEffect, useState } from "react";
import useSingleCircleData from "../../hooks/useSingleCircle";
import EmailInput from "../../components/pageComponents/request/emailInput";
import NameInput from "../../components/pageComponents/request/nameInput";
import DetailInput from "../../components/pageComponents/request/detailInput";
import DateTypeSelect from "../../components/pageComponents/request/dateTypeSelect";
import WeekSelect from "../../components/pageComponents/request/weekSelect/weekSelect";
import SelectTime from "../../components/pageComponents/request/weekSelect/selectTime";
import TimeDetailInput from "../../components/pageComponents/request/timeDetailInput";
import CampuseSelect from "../../components/pageComponents/request/campuseSelect";

const EditProfile=()=>{
    const { id } = useParams();
    const {user,loading} = useFirebaseUser();
    const {circleData,loading:loadData} = useSingleCircleData(id)
    const navigate = useNavigate()
    const [mail,setMail] = useState(circleData?.email || "");
    const [name, setName] = useState(circleData?.name || "");
    const [detail,setDetail] = useState(circleData?.detail || "");
    const [dateType,setDateType] = useState(circleData?.activeDate.type || "weekly");
    const [selectedWeek,setSelectedWeek] = useState<string[]>(
        typeof circleData?.activeDate.data!=="string" ? circleData?.activeDate.data.week || [] : []);
    const [selectedCampuses, setSelectedCampuses] = useState<string[]>([]);
    const [selectedStartTime,setSelectedStartTime] = useState(
        typeof circleData?.activeDate.data!=="string" ? circleData?.activeDate.data.start || "" : "");
    const [selectedEndTime,setSelectedEndTime] = useState("");
    const [timeDetail,setTimeDetail] = useState("");

    useEffect(()=>{
        if(!user && !loading){
            navigate("/")
        }
    },[user])

    return (
        <Layout>
            <div className="flex flex-col">
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
                {/* {!loading && !success && <ConfirmButton onClick={async () => { await handleRequest(); } }>
                    申請する
                </ConfirmButton>}
                {loading && !success && <ClipLoader color="#36d7b7" size={50}  />}
                {success && <SuccessCheck size={50} />}
                {errMessage!=="" && <p>{errMessage}</p>}
                {loadingMessage!=="" && <p>{loadingMessage}</p>} */}
            </div>
        </Layout>
    )
}

export default EditProfile;