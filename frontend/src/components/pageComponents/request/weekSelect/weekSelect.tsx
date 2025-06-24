import * as React from "react"
import CommonCheckbox from "../../../common/textField/commonCheckbox";

type Props={
    selectedWeek:string[]
    setSelectedWeek: React.Dispatch<React.SetStateAction<string[]>>;
}

const WeekSelect=({selectedWeek,setSelectedWeek}:Props)=>{
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        setSelectedWeek((prev) =>{
            return checked ? [...prev, value] : prev.filter((v) => v !== value);
        }
        );
    };

    const weeks = [
        { label: "月曜日", value: "月曜日" },
        { label: "火曜日", value: "火曜日" },
        { label: "水曜日", value: "水曜日" },
        { label: "木曜日", value: "木曜日" },
        { label: "金曜日", value: "金曜日" },
        { label: "土曜日", value: "土曜日" },
        { label: "日曜日", value: "日曜日" },
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
                        name={""}
                        errMessage={""}  />
                ))}
            </div>
        </div>
    )
}

export default WeekSelect;