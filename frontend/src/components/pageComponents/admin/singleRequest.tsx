import { useState } from "react"
import ApproveModal from "./approveModal"
import DenyModal from "./denyModal"
import RequestDetail from "./requestDetail"
import { Circle } from "../../../types/Circle"
import CommonToggle from "../../common/toggle/toggle"

type Props={
  item:Circle;
  setPendingData: React.Dispatch<React.SetStateAction<Circle[]>>;
}

const SingleRequest = ({ item,setPendingData }:Props) => {
  const [showModal,setShowModal] = useState(false);
  const [showDenyModal,setShowDenyModal] = useState(false)

  return (
    <div
      className=""
    >
      <CommonToggle title={`サークル名: ${item.name}`}>
        <RequestDetail item={item} setShowDenyModal={setShowDenyModal} setShowModal={setShowModal} />
      </CommonToggle>
      <ApproveModal showModal={showModal} setShowModal={setShowModal} pendingData={item} setPendingData={setPendingData} />
      <DenyModal showModal={showDenyModal} setShowModal={setShowDenyModal} pendingData={item} setPendingData={setPendingData} />
    </div>
  )
}

export default SingleRequest
