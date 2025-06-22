import * as React from "react"
import CommonCheckbox from "../../common/textField/commonCheckbox"
import "./campuseSelect.css"

type Props={
  selectedCampuses:string[];
  setSelectedCampuses: React.Dispatch<React.SetStateAction<string[]>>;
}

const CampuseSelect = ({ selectedCampuses, setSelectedCampuses }:Props) => {

  const campuses = [
    { label: "深草", value: "hukakusa" },
    { label: "瀬田", value: "seta" },
    { label: "大宮", value: "omiya" },
  ]
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target
    setSelectedCampuses((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    )
  }

  return (
    <div className="campus-select-container">
      <p className="campus-select-title">活動キャンパス（複数選択可）</p>
      <div className="campus-grid">
        {campuses.map((campus) => (
            <CommonCheckbox
              key={campus.value}
              value={campus.value}
              checked={selectedCampuses.includes(campus.value)}
              onChange={handleChange}
              label={campus.label}
              name={""}
              errMessage={""}   />
        ))}
      </div>
    </div>
  )
}

export default CampuseSelect
