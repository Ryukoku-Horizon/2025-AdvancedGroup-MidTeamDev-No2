import { Circle, StringfyCircle } from "../types/Circle"

export const convertPendingData=(pendingData:StringfyCircle[]):Circle[]=>{
    return pendingData.map((item)=>{
        const activeDate = JSON.parse(item.activeDate);
        const location = JSON.parse(item.location);
        const convertedLocation = convertLoacation(location)
        const type = convertFrequency(activeDate.type)

        if(activeDate.type==="weekly"){
            const convertedWeek = convertWeek(activeDate.data.week);
            return {
                ...item,
                location:convertedLocation,
                activeDate:{
                    type,
                    data:{
                        ...activeDate.data,
                        week:convertedWeek
                    }
                }
            }
        }else{
            return {
                ...item,
                location:convertedLocation,
                activeDate:{
                    data:activeDate.data,
                    type
                }
            }
        }
    })
}

export const convertCircleData=(circleData:StringfyCircle):Circle=>{
    const activeDate = JSON.parse(circleData.activeDate);
    const location = JSON.parse(circleData.location);

    if(activeDate.type==="weekly"){
        const convertedWeek = convertWeek(activeDate.data.week);
        return {
            ...circleData,
            location:location,
            activeDate:{
                type:activeDate.type,
                data:{
                    ...activeDate.data,
                    week:convertedWeek
                }
            }
        }
    }else{
        return {
            ...circleData,
            location:location,
            activeDate:{
                data:activeDate.data,
                type:activeDate.type
            }
        }
    }
}

const convertFrequency=(type:string)=>{
    if(type==="weekly"){
        return "毎週"
    }else if(type==="monthly"){
        return "月に数回"
    }else if(type==="irregula"){
        return "不定期"
    }else{
        return type
    }
}

const convertWeek=(weeks:string[])=>{
    return weeks.map((week)=>{
        if(week==="mon"){
            return "月曜日"
        }else if(week==="tue"){
            return "火曜日";
        }else if(week ==="wen"){
            return "水曜日"
        }else if(week==="thu"){
            return "木曜日"
        }else if(week==="fri"){
            return "金曜日"
        }else if(week==="sat"){
            return "土曜日"
        }else if(week==="sun"){
            return "日曜日"
        }else{
            return week
        }
    })
}

const convertLoacation=(locations:string[]):string[]=>{
    return locations.map((location)=>{
        if(location==="hukakusa"){
            return "深草";
        }else if(location==="seta"){
            return "瀬田";
        }else if(location==="omiya"){
            return "大宮";
        }else{
            return location
        }
    })
}