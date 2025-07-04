import Modal from 'react-modal'
import CancelButton from "../../common/Btn/cancelBtn/cancelBtn"
import useResponse from "../../../hooks/useResponse"
import "./modal.css";
import SuccessCheck from "../../common/checkmark/successCheck"
import { ClipLoader } from "react-spinners"
import DeleteButton from "../../common/Btn/deleteBtn/deleteBtn"
import { Circle } from "../../../types/Circle";

type Props={
    showModal:boolean;
    setShowModal:(arg:boolean)=>void;
    pendingData:Circle;
    setPendingData: React.Dispatch<React.SetStateAction<Circle[]>>
}

const DenyModal=({showModal,setShowModal,pendingData,setPendingData}:Props)=>{
    const {loading,errMessage,success,closeModal,deny} = useResponse(setShowModal,setPendingData,pendingData.id);

    return (
        <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        shouldCloseOnOverlayClick={true}
        closeTimeoutMS={0}
        className="approve-modal"
        overlayClassName="approve-overlay"
        >
            <div className="modal-content">
                <p>{pendingData.name}の申請を拒否しますか？</p>
                <p>{errMessage}</p>
                <div className="modal-buttons">
                    {!loading && !success && <>
                        <DeleteButton onClick={()=>{
                            deny(pendingData)
                            }}>はい</DeleteButton>
                        <CancelButton onClick={()=>{closeModal()}}>いいえ</CancelButton>
                    </>}
                    {loading && !success && <ClipLoader color="#36d7b7" size={30}  />}
                    {success && <SuccessCheck size={30} />}
                </div>
            </div>
        </Modal>
    )
}

export default DenyModal;