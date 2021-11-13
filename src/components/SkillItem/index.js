import './index.css'

const SkillItem = props => {
  const {skillDetails} = props
  const {imageUrl, name} = skillDetails

  return (
    <li className="skill-item-container">
      <img src={imageUrl} alt={name} className="skill-image" />
      <p className="skill-name">{name}</p>
    </li>
  )
}

export default SkillItem
