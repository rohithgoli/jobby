import './index.css'

const FiltersGroup = props => {
  const renderEmploymentTypesList = () => {
    const {employmentTypesList, onChangeEmploymentType} = props
    return employmentTypesList.map(eachType => {
      const {employmentTypeId, label} = eachType
      const onSelectEmploymentType = () => {
        onChangeEmploymentType(employmentTypeId)
      }
      return (
        <li key={employmentTypeId} className="filter-item-container">
          <input
            type="checkbox"
            id={employmentTypeId}
            className="input-checkbox"
            onChange={onSelectEmploymentType}
          />
          <label className="filter-label">{label}</label>
        </li>
      )
    })
  }

  const renderEmploymentTypes = () => (
    <div className="filter-container">
      <p>Type of Employment</p>
      <ul className="filter-items-container">{renderEmploymentTypesList()}</ul>
    </div>
  )

  const renderSalaryRangesList = () => {
    const {salaryRangesList, onChangeSalaryRange} = props
    return salaryRangesList.map(eachRange => {
      const {salaryRangeId, label} = eachRange
      const onSelectSalaryRange = () => {
        onChangeSalaryRange(salaryRangeId)
      }
      return (
        <li key={salaryRangeId} className="filter-item-container">
          <input
            type="radio"
            id={salaryRangeId}
            className="input-checkbox"
            name="salaryRange"
            onChange={onSelectSalaryRange}
          />
          <label className="filter-label">{label}</label>
        </li>
      )
    })
  }

  const renderSalaryRanges = () => (
    <div className="filter-container">
      <p>Salary Range</p>
      <ul className="filter-items-container">{renderSalaryRangesList()}</ul>
    </div>
  )

  return (
    <>
      {renderEmploymentTypes()}
      {renderSalaryRanges()}
    </>
  )
}

export default FiltersGroup
