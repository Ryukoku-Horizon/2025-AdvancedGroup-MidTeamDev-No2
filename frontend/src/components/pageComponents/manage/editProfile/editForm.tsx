import { Link } from "react-router-dom"
import CommonFileInput from "../../../common/textField/commonFileInput"
import NameInput from "../../request/nameInput"
import DetailInput from "../../request/detailInput"
import DateTypeSelect from "../../request/dateTypeSelect"
import WeekSelect from "../../request/weekSelect/weekSelect"
import SelectTime from "../../request/weekSelect/selectTime"
import TimeDetailInput from "../../request/timeDetailInput"
import CampuseSelect from "../../request/campuseSelect"
import { ClipLoader } from "react-spinners"
import ConfirmButton from "../../../common/Btn/confirmBtn/confirmBtn"
import SuccessCheck from "../../../common/checkmark/successCheck"
import CenterLoader from "../../../common/loader/centerLoader"
import { useEffect, useState } from "react"
import useSingleCircleData from "../../../../hooks/useSingleCircle"
import useEditCircle from "../../../../hooks/useEditCircle"
import { fileToBase64 } from "../../../../libs/handleImage"

type Props={
    circleId:string | undefined;
    loading:boolean;
}

const EditForm=({circleId,loading}:Props)=>{
    const {edit,errMessage,loading:editLoading,success} = useEditCircle(circleId)
    const {circleData,loading:loadData} = useSingleCircleData(circleId)
    const [name, setName] = useState("");
    const [detail,setDetail] = useState("");
    const [dateType,setDateType] = useState(circleData?.activeDate.type || "");
    const [selectedWeek,setSelectedWeek] = useState<string[]>([]);
    const [selectedCampuses, setSelectedCampuses] = useState<string[]>([]);
    const [selectedStartTime,setSelectedStartTime] = useState("");
    const [selectedEndTime,setSelectedEndTime] = useState("");
    const [timeDetail,setTimeDetail] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const env = process.env.REACT_APP_URL ?? ""

    useEffect(()=>{
        if(circleData){
            setName(circleData.name);
            setDetail(circleData.detail);
            setDateType(circleData.activeDate.type)
            if(typeof circleData.activeDate.data==="string") setTimeDetail(circleData.activeDate.data);
            if(typeof circleData.activeDate.data!=="string"){
                setSelectedWeek(circleData.activeDate.data.week);
                setSelectedStartTime(circleData.activeDate.data.start);
                setSelectedEndTime(circleData.activeDate.data.end);
            };
            setSelectedCampuses(circleData.location)
        }
    },[circleData])

    const handleEdit=async()=>{
        if(circleData && name!=="" && detail!=="" && selectedCampuses.length!==0){
            if((dateType==="毎週" && selectedWeek.length!==0) || (dateType!=="毎週" && timeDetail!=="")){
                let base64:string | undefined;
                if(image){
                    base64 = await fileToBase64(image)
                }
                await edit({
                    id:circleData.id,
                    name,
                    detail,
                    location:selectedCampuses,
                    email:circleData.email,
                    activeDate:{
                        type:dateType,
                        data:dateType==="毎週" ? {
                            week:selectedWeek,
                            start:selectedStartTime,
                            end:selectedEndTime
                        } : timeDetail
                    },
                    image:""
                },base64 ? base64 : undefined)
            }
        }
    }

    return (
        <>
            {!loadData && circleData && <div className="flex flex-col items-start">
            <Link to={`${env}/manage/${circleId}`} className="back-link mb-3">← 戻る</Link>
            <CommonFileInput setFile={setImage} circleImage={circleData.image} />
            <NameInput name={name} setName={setName} />
            <DetailInput detail={detail} setDetail={setDetail} />
            <DateTypeSelect dateType={dateType} setDateType={setDateType} />
            {dateType==="毎週" && <div className="">
                <WeekSelect selectedWeek={selectedWeek} setSelectedWeek={setSelectedWeek} />
                <SelectTime
                    selectedStartTime={selectedStartTime} 
                    setSelectedStartTime={setSelectedStartTime} 
                    selectedEndTime={selectedEndTime} 
                    setSelectedEndTime={setSelectedEndTime} />
            </div>}
            {dateType!=="毎週" && <TimeDetailInput timeDetail={timeDetail} setTimeDetail={setTimeDetail} dateType={dateType} />}
            <CampuseSelect setSelectedCampuses={setSelectedCampuses} selectedCampuses={selectedCampuses} />
            {!loading && !editLoading && !success && <ConfirmButton onClick={() => {handleEdit()} }>
                確定
            </ConfirmButton>}
            {editLoading && !success && <ClipLoader color="#36d7b7" size={50}  />}
            {success && <SuccessCheck size={50} />}
            {errMessage!=="" && <p>{errMessage}</p>}
        </div>}
        {(loading || loadData) && <CenterLoader />}
        </>
    )
}

export default EditForm;