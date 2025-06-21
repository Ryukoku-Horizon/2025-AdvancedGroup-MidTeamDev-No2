import * as React from "react"
import Modal from 'react-modal'
import CancelButton from "../../common/Btn/cancelBtn/cancelBtn"
import useResponse from "../../../hooks/useResponse"
import "./modal.css";
import usePendingData from "../../../hooks/usePendingData"
import SuccessCheck from "../../common/checkmark/successCheck"
import { ClipLoader } from "react-spinners"
import DeleteButton from "../../common/Btn/deleteBtn/deleteBtn"

const DenyModal=({showModal,setShowModal,pendingData})=>{
    const {loading,errMessage,success,closeModal,deny} = useResponse(setShowModal);
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
                <p>{pendingData.name}の申請を拒否しますか？</p>
                <p>{errMessage}</p>
                <div className="modal-buttons">
                    {!loading && !success && <>
                        <DeleteButton onClick={()=>{deny(pendingData)}}>はい</DeleteButton>
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