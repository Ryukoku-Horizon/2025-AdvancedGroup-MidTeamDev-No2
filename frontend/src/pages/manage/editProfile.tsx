import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import useFirebaseUser from "../../hooks/useFirebase";
import { useEffect, useState } from "react";
import useSingleCircleData from "../../hooks/useSingleCircle";
import NameInput from "../../components/pageComponents/request/nameInput";
import DetailInput from "../../components/pageComponents/request/detailInput";
import DateTypeSelect from "../../components/pageComponents/request/dateTypeSelect";
import WeekSelect from "../../components/pageComponents/request/weekSelect/weekSelect";
import SelectTime from "../../components/pageComponents/request/weekSelect/selectTime";
import TimeDetailInput from "../../components/pageComponents/request/timeDetailInput";
import CampuseSelect from "../../components/pageComponents/request/campuseSelect";
import useEditCircle from "../../hooks/useEditCircle";
import ConfirmButton from "../../components/common/Btn/confirmBtn/confirmBtn";
import SuccessCheck from "../../components/common/checkmark/successCheck";
import { ClipLoader } from "react-spinners";
import TopBar from "../../components/pageComponents/manage/topbar";
import MainScreen from "../../components/pageComponents/manage/mainScreen";
import SideMenu from "../../components/pageComponents/manage/sidemenu";
import RequireLoginMessage from "../../components/common/messageBord/requireLoginMessage";
import CenterLoader from "../../components/common/loader/centerLoader";
import CommonFileInput from "../../components/common/textField/commonFileInput";
import { fileToBase64 } from "../../libs/handleImage";

const EditProfile=()=>{
    const { id } = useParams();
    const {user,loading} = useFirebaseUser();
    const {edit,errMessage,loading:editLoading,success} = useEditCircle(id)
    const {circleData,loading:loadData} = useSingleCircleData(id)
    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [detail,setDetail] = useState("");
    const [dateType,setDateType] = useState(circleData?.activeDate.type || "");
    const [selectedWeek,setSelectedWeek] = useState<string[]>([]);
    const [selectedCampuses, setSelectedCampuses] = useState<string[]>([]);
    const [selectedStartTime,setSelectedStartTime] = useState("");
    const [selectedEndTime,setSelectedEndTime] = useState("");
    const [timeDetail,setTimeDetail] = useState("");
    const [image, setImage] = useState<File | null>(null);

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

    useEffect(()=>{
        if(!user && !loading){
            navigate("/")
        }
    },[user])

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
        <Layout>
            {!user && !loading && <RequireLoginMessage />}
            <div className="manage-container">
            <TopBar back={()=>{navigate(`/manage/${id}`)}} />
                <div className="main-content">
                    <SideMenu id={id} />
                    <MainScreen>
                        {!loadData && circleData && <div className="flex flex-col items-start">
                            <Link to={`/manage/${id}`} className="back-link mb-3">← 戻る</Link>
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
                            {!loading && !success && <ConfirmButton onClick={() => {handleEdit()} }>
                                確定
                            </ConfirmButton>}
                            {editLoading && !success && <ClipLoader color="#36d7b7" size={50}  />}
                            {success && <SuccessCheck size={50} />}
                            {errMessage!=="" && <p>{errMessage}</p>}
                        </div>}
                        {loading || loadData && <CenterLoader />}
                    </MainScreen>
                </div>
            </div>
        </Layout>
    )
}

export default EditProfile;