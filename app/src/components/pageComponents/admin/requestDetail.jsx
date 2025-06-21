import * as React from "react"
import { motion } from "framer-motion"
import ConfirmButton from "../../common/Btn/confirmBtn/confirmBtn"
import CancelButton from "../../common/Btn/cancelBtn/cancelBtn"

const RequestDetail=({item,setShowModal,setShowDenyModal})=>{
    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden mt-2 pl-2 border-t pt-2"
          >
            <p>Email: {item.email}</p>
            <p>活動内容: {item.detail}</p>
            <p>活動頻度: {item.activeDate.type}</p>
            <p>活動時間: {item.type}</p>

            {item.activeDate.type === "毎週" &&
              item.activeDate.data.week.map((item2, i) => (
                <p key={i}>・{item2}</p>
              ))}

            {item.activeDate.type !== "毎週" && (
              <p>{item.activeDate.data}</p>
            )}

            <p className="flex flex-wrap gap-1">
              活動場所:{" "}
              {item.location.map((l, i) => (
                <span
                  key={i}
                  className="px-1 py-0_5 bg-gray-200 text-sm rounded"
                >
                  {l}
                </span>
              ))}
            </p>
            <div className="flex gap-2">
                <ConfirmButton onClick={()=>{setShowModal(true)}}>了承する</ConfirmButton>
                <CancelButton onClick={()=>{setShowDenyModal(true)}}>拒否する</CancelButton>
            </div>
          </motion.div>
    )
}

export default RequestDetail;