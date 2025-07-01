import * as React from "react"
import Modal from 'react-modal'
import "./modal.css";
import ConfirmButton from "../../common/Btn/confirmBtn/confirmBtn";
import CancelButton from "../../common/Btn/cancelBtn/cancelBtn";
import useResponse from "../../../hooks/useResponse";
import { ClipLoader } from "react-spinners";
import SuccessCheck from "../../common/checkmark/successCheck";
import { Circle } from "../../../types/Circle";

type Props={
    showModal:boolean;
    setShowModal:(arg:boolean)=>void;
    pendingData:Circle;
    setPendingData: React.Dispatch<React.SetStateAction<Circle[]>>
}

const ApproveModal=({showModal,setShowModal,pendingData,setPendingData}:Props)=>{
    const {approve,loading,errMessage,success,closeModal} = useResponse(setShowModal,setPendingData,pendingData.id)

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
                        <ConfirmButton onClick={()=>{
                            approve(pendingData)
                        }
                        }>はい</ConfirmButton>
                        <CancelButton onClick={() => {
                            closeModal();
                            } }>いいえ</CancelButton>
                    </>}
                    {loading && !success && <ClipLoader color="#36d7b7" size={30}  />}
                    {success && <SuccessCheck size={35} />}
                </div>
            </div>
        </Modal>
    )
}

export default ApproveModal;