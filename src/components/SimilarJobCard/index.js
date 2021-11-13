import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobCard = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    rating,
    location,
    title,
  } = similarJobDetails
  return (
    <li className="similar-job-card">
      <div className="similar-job-card-top-section">
        <div className="similar-job-card-title-container">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
            className="similar-job-company-logo"
          />
          <div className="similar-job-title-rating-container">
            <h1 className="similar-job-title">{title}</h1>
            <div className="similar-job-rating-container">
              <AiFillStar className="similar-job-star-image" />
              <p>{rating}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="similar-job-card-middle-section">
        <h1 className="similar-job-description-heading">Description</h1>
        <p className="similar-job-description-content">{jobDescription}</p>
      </div>
      <div className="similar-job-card-bottom-section">
        <div className="job-detail-container">
          <MdLocationOn className="similar-job-details-logo" />
          <p className="details-info">{location}</p>
        </div>
        <div className="job-detail-container">
          <BsBriefcaseFill className="similar-job-details-logo" />
          <p className="details-info">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobCard
