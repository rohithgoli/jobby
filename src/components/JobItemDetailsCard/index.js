import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FaExternalLinkAlt} from 'react-icons/fa'

import './index.css'
import SimilarJobCard from '../SimilarJobCard'
import SkillItem from '../SkillItem'

const JobItemDetailsCard = props => {
  const {jobItemDetails} = props
  const {
    companyLogoUrl,
    companyWebsiteUrl,
    employmentType,
    jobDescription,
    lifeAtCompany,
    location,
    title,
    packagePerAnnum,
    rating,
    similarJobs,
  } = jobItemDetails

  const {description, imageUrl} = lifeAtCompany

  const renderSkills = () => {
    const {skills} = jobItemDetails
    return (
      <ul className="skills-container">
        {skills.map(eachSkill => (
          <SkillItem key={eachSkill.name} skillDetails={eachSkill} />
        ))}
      </ul>
    )
  }

  const renderSimilarJobs = () => (
    <div className="similar-jobs-container">
      {similarJobs.map(eachSimilarJob => (
        <SimilarJobCard
          key={eachSimilarJob.id}
          similarJobDetails={eachSimilarJob}
        />
      ))}
    </div>
  )

  return (
    <>
      <div className="job-item-container">
        <div className="job-card-top-section">
          <div className="job-card-title-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div className="title-rating-container">
              <h1 className="job-title">{title}</h1>
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
          <div className="description-visit-container">
            <h1 className="section-title">Description</h1>
            <a
              target="_blank"
              rel="noreferrer"
              className="visit-content"
              href={companyWebsiteUrl}
            >
              Visit
              <FaExternalLinkAlt className="visit-icon" />
            </a>
          </div>
          <p className="description">{jobDescription}</p>
          <h1 className="section-title">Skills</h1>
          {renderSkills()}
          <h1 className="section-title">Life at Company</h1>
          <div className="life-at-company-section-container">
            <p className="description">{description}</p>
            <img
              src={imageUrl}
              alt="life at company"
              className="life-at-company-image"
            />
          </div>
        </div>
      </div>
      <div className="similar-jobs-section-container">
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <div className="similar-jobs-section">{renderSimilarJobs()}</div>
      </div>
    </>
  )
}

export default JobItemDetailsCard
