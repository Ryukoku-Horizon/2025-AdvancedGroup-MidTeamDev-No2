import * as React from "react"
import CommonCheckbox from "../../../common/textField/commonCheckbox";

const WeekSelect=({selectedWeek,setSelectedWeek})=>{
    const handleChange = (event) => {
        const { value, checked } = event.target;
        setSelectedWeek((prev) =>{
            return checked ? [...prev, value] : prev.filter((v) => v !== value);
        }
        );
    };

    const weeks = [
        { label: "月曜日", value: "mon" },
        { label: "火曜日", value: "tue" },
        { label: "水曜日", value: "wen" },
        { label: "木曜日", value: "thu" },
        { label: "金曜日", value: "fri" },
        { label: "土曜日", value: "sat" },
        { label: "日曜日", value: "sun" },
      ]

    return (
        <div>
            <p>活動曜日</p>
            <div className="flex gap-2">
                {weeks.map((item)=>(
                    <CommonCheckbox
                    value={item.value}
                    checked={selectedWeek.includes(item.value)}
                    onChange={handleChange}
                    label={item.label}
                    />
                ))}
            </div>
        </div>
    )
}

export default WeekSelect;