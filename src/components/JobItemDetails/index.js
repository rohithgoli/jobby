import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookie from 'js-cookie'

import JobItemDetailsCard from '../JobItemDetailsCard'

import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {apiStatus: apiStatusConstants.initial, jobItemDetails: ''}

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookie.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = {
        jobDetails: fetchedData.job_details,
        similarJobs: fetchedData.similar_jobs,
      }
      const updatedJobDetails = {
        companyLogoUrl: updatedData.jobDetails.company_logo_url,
        companyWebsiteUrl: updatedData.jobDetails.company_website_url,
        employmentType: updatedData.jobDetails.employment_type,
        id: updatedData.jobDetails.id,
        jobDescription: updatedData.jobDetails.job_description,
        skills: updatedData.jobDetails.skills.map(eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        })),
        lifeAtCompany: {
          description: updatedData.jobDetails.life_at_company.description,
          imageUrl: updatedData.jobDetails.life_at_company.image_url,
        },
        location: updatedData.jobDetails.location,
        packagePerAnnum: updatedData.jobDetails.package_per_annum,
        rating: updatedData.jobDetails.rating,
        title: updatedData.jobDetails.title,
        similarJobs: updatedData.similarJobs.map(eachSimilarJob => ({
          companyLogoUrl: eachSimilarJob.company_logo_url,
          employmentType: eachSimilarJob.employment_type,
          id: eachSimilarJob.id,
          jobDescription: eachSimilarJob.job_description,
          location: eachSimilarJob.location,
          rating: eachSimilarJob.rating,
          title: eachSimilarJob.title,
        })),
      }
      this.setState({
        apiStatus: apiStatusConstants.success,
        jobItemDetails: updatedJobDetails,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onJobDetailsRetry = () => {
    this.getJobItemDetails()
  }

  renderJobDetailsFailureView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="failure-title">Oops! Something Went Wrong</h1>
      <p className="failure-msg">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-btn"
        onClick={this.onJobDetailsRetry}
      >
        Retry
      </button>
    </>
  )

  renderJobDetailsSuccessView = () => {
    const {jobItemDetails} = this.state
    return <JobItemDetailsCard jobItemDetails={jobItemDetails} />
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsSuccessView()
      case apiStatusConstants.failure:
        return this.renderJobDetailsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-details-container">{this.renderJobDetails()}</div>
      </>
    )
  }
}

export default JobItemDetails
