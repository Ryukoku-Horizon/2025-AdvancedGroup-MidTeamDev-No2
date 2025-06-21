import * as React from "react"
import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import ApproveModal from "./approveModal"
import DenyModal from "./denyModal"
import RequestDetail from "./requestDetail"
import RequestHeader from "./requestHeader"
import { Circle } from "../../../types/Circle"

type Props={
  item:Circle;
}

const SingleRequest = ({ item }:Props) => {
  const [showDetail, setShowDetail] = useState(false);
  const [showModal,setShowModal] = useState(false);
  const [showDenyModal,setShowDenyModal] = useState(false)

  return (
    <div
      className="flex flex-col border px-3 py-2"
    >
      <RequestHeader name={item.name} setShowDetail={setShowDetail} showDetail={showDetail} />
      <AnimatePresence initial={false}>
        {showDetail && 
          <RequestDetail item={item} setShowDenyModal={setShowDenyModal} setShowModal={setShowModal} />}
      </AnimatePresence>
      <ApproveModal showModal={showModal} setShowModal={setShowModal} pendingData={item} />
      <DenyModal showModal={showDenyModal} setShowModal={setShowDenyModal} pendingData={item} />
    </div>
  )
}

export default SingleRequest
