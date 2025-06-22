import CommonSelect from "../../common/textField/commonSelect"

type Props={
    setDateType:(arg:string)=>void;
    dateType:string;
}

const DateTypeSelect=({setDateType,dateType}:Props)=>{

    const options =[
        {label:"毎週",value:"weekly"},
        {label:"月に数回",value:"monthly"},
        {label:"不定期",value:"irregular"}
    ]

    return (
        <CommonSelect
            label="活動頻度"
            name="dateType"
            value={dateType}
            onChange={(e) => {
                setDateType(e.target.value)
            } }
            options={options}
            required
            placeholder="活動頻度" 
            errMessage="この欄は必須です"  />
    )
}

export default DateTypeSelect