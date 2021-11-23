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
          <label className="filter-label" htmlFor={employmentTypeId}>
            {label}
          </label>
        </li>
      )
    })
  }

  const renderEmploymentTypes = () => (
    <div className="filter-container">
      <h1 className="filter-name">Type of Employment</h1>
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
          <label className="filter-label" htmlFor={salaryRangeId}>
            {label}
          </label>
        </li>
      )
    })
  }

  const renderSalaryRanges = () => (
    <div className="filter-container">
      <h1 className="filter-name">Salary Range</h1>
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
