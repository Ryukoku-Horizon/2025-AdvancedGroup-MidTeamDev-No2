import * as React from "react"
import CommonCheckbox from "../../common/textField/commonCheckbox"
import "./CampuseSelect.css"

const campuses = [
  { label: "深草", value: "hukakusa" },
  { label: "瀬田", value: "seta" },
  { label: "大宮", value: "omiya" },
]

const CampuseSelect = ({ selectedCampuses, setSelectedCampuses }) => {
  const handleChange = (event) => {
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
          <label
            key={campus.value}
            className={`campus-item ${selectedCampuses.includes(campus.value) ? "selected" : ""}`}
          >
            <CommonCheckbox
              value={campus.value}
              checked={selectedCampuses.includes(campus.value)}
              onChange={handleChange}
            />
            <span className="campus-label">{campus.label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default CampuseSelect
