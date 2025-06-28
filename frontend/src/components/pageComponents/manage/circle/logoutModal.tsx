import Modal from 'react-modal'
import "./modal.css";
import { ClipLoader } from "react-spinners";
import useFirebaseUser from '../../../../hooks/useFirebase';
import CancelButton from '../../../common/Btn/cancelBtn/cancelBtn';
import DeleteButton from '../../../common/Btn/deleteBtn/deleteBtn';

type Props={
    showModal:boolean;
    setShowModal:(arg:boolean)=>void;
}

const LogoutModal=({showModal,setShowModal}:Props)=>{
    const {logout,loading} = useFirebaseUser()

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
                <p>ログアウトしますか？</p>
                <div className="modal-buttons">
                    {!loading && <>
                        <DeleteButton onClick={()=>{logout()}}>はい</DeleteButton>
                        <CancelButton onClick={() => { setShowModal(false); } }>いいえ</CancelButton>
                    </>}
                    {loading && <ClipLoader color="#36d7b7" size={30}  />}
                </div>
            </div>
        </Modal>
    )
}

export default LogoutModal;