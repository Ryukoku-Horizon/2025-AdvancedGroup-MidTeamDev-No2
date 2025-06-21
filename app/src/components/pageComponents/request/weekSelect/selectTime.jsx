import * as React from "react";
import CommonTimeInput from "../../../common/textField/commonTimeInput";
import "./selectTime.css"

const SelectTime = ({
  selectedStartTime,
  setSelectedStartTime,
  selectedEndTime,
  setSelectedEndTime
}) => {
  return (
    <div>
        <p className="time-title">活動時間</p>
        <div className="time-section">
          <div className="time-block">
              <label className="time-label">開始時刻</label>
              <CommonTimeInput input={selectedStartTime} setInput={setSelectedStartTime} />
          </div>
          <span className="time-separator">〜</span>
          <div className="">
              <label className="time-label">終了時刻</label>
              <CommonTimeInput input={selectedEndTime} setInput={setSelectedEndTime} />
          </div>
        </div>
    </div>
  );
};

export default SelectTime;
