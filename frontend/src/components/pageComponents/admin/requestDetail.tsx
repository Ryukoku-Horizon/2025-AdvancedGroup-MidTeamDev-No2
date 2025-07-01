import { motion } from "framer-motion"
import ConfirmButton from "../../common/Btn/confirmBtn/confirmBtn"
import CancelButton from "../../common/Btn/cancelBtn/cancelBtn";
import { Circle } from "../../../types/Circle";

type Props={
  item:Circle;
  setShowModal:(arg:boolean)=>void;
  setShowDenyModal:(arg:boolean)=>void;
}

const RequestDetail=({item,setShowModal,setShowDenyModal}:Props)=>{
    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden pl-2 pt-2"
          >
            <p>Email: {item.email}</p>
            <p>活動内容: {item.detail}</p>
            <p>活動頻度: {item.activeDate.type}</p>

            {item.activeDate.type === "毎週" && typeof item.activeDate.data!=="string" &&
            <div>
              <p>活動曜日</p>
              <div className="flex gap-1">
                {item.activeDate.data.week.map((item2, i) => (
                  <p key={i}>・{item2}</p>
                ))}
              </div>
            </div>}

            {item.activeDate.type !== "毎週" && (
              <p>{item.activeDate.data==="string" ? item.activeDate.data : ""}</p>
            )}

            <div>
              <p>活動場所:</p>
              <div className="flex">
                {item.location.map((l, i) => (
                  <p key={i}>
                    ・{l}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
                <ConfirmButton onClick={()=>{setShowModal(true)}}>了承する</ConfirmButton>
                <CancelButton onClick={()=>{setShowDenyModal(true)}}>拒否する</CancelButton>
            </div>
          </motion.div>
    )
}

export default RequestDetail;