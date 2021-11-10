import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobCard = props => {
  const {jobItem} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobItem

  return (
    <li className="job-item-card">
      <div className="job-card-title-container">
        <img src={companyLogoUrl} alt="company lobo" className="company-logo" />
        <div className="title-rating-container">
          <p className="job-title">{title}</p>
          <div className="rating-container">
            <AiFillStar className="star-image" />
            <p>{rating}</p>
          </div>
        </div>
      </div>
      <div className="job-card-details-container">
        <div className="job-detail-container">
          <MdLocationOn className="details-logo" />
          <p className="details-info">{location}</p>
        </div>
        <div className="job-detail-container">
          <BsBriefcaseFill className="details-logo" />
          <p className="details-info">{employmentType}</p>
        </div>
        <p className="job-package">{packagePerAnnum}</p>
      </div>
      <p className="job-description-title">Description</p>
      <p className="job-description">{jobDescription}</p>
    </li>
  )
}

export default JobCard
