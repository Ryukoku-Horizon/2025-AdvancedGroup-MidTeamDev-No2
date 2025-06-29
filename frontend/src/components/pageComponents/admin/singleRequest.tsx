import { useState } from "react"
import ApproveModal from "./approveModal"
import DenyModal from "./denyModal"
import RequestDetail from "./requestDetail"
import { Circle } from "../../../types/Circle"
import CommonToggle from "../../common/toggle/toggle"

type Props={
  item:Circle;
}

const SingleRequest = ({ item }:Props) => {
  // const [showDetail, setShowDetail] = useState(false);
  const [showModal,setShowModal] = useState(false);
  const [showDenyModal,setShowDenyModal] = useState(false)

  return (
    <div
      className=""
    >
      <CommonToggle title={`サークル名: ${item.name}`}>
        <RequestDetail item={item} setShowDenyModal={setShowDenyModal} setShowModal={setShowModal} />
      </CommonToggle>
      <ApproveModal showModal={showModal} setShowModal={setShowModal} pendingData={item} />
      <DenyModal showModal={showDenyModal} setShowModal={setShowDenyModal} pendingData={item} />
    </div>
  )
}

export default SingleRequest
