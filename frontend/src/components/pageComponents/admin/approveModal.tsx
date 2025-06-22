import * as React from "react"
import Modal from 'react-modal'
import "./modal.css";
import ConfirmButton from "../../common/Btn/confirmBtn/confirmBtn";
import CancelButton from "../../common/Btn/cancelBtn/cancelBtn";
import useResponse from "../../../hooks/useResponse";
import { ClipLoader } from "react-spinners";
import SuccessCheck from "../../common/checkmark/successCheck";
import usePendingData from "../../../hooks/usePendingData";
import { Circle } from "../../../types/Circle";

type Props={
    showModal:boolean;
    setShowModal:(arg:boolean)=>void;
    pendingData:Circle;
}

const ApproveModal=({showModal,setShowModal,pendingData}:Props)=>{
    const {approve,loading,errMessage,success,closeModal} = useResponse(setShowModal)
    const {setPendingData} = usePendingData()

    React.useEffect(()=>{
        if(success){
            setPendingData((prev)=>prev.filter((item)=>item.id !== pendingData.id))
        }
    },[success])

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
                <p>{pendingData.name}に了承メールを送信しますか？</p>
                <p>{errMessage}</p>
                <div className="modal-buttons">
                    {!loading && !success && <>
                        <ConfirmButton onClick={()=>{approve(pendingData)}}>はい</ConfirmButton>
                        <CancelButton onClick={() => { closeModal(); } }>いいえ</CancelButton>
                    </>}
                    {loading && !success && <ClipLoader color="#36d7b7" size={30}  />}
                    {success && <SuccessCheck size={30} />}
                </div>
            </div>
        </Modal>
    )
}

export default ApproveModal;