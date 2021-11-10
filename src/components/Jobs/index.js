import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import JobCard from '../JobCard'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    profileApiStatus: apiStatusConstants.initial,
    jobsApiStatus: apiStatusConstants.initial,
    searchText: '',
    activeEmploymentType: [],
    salaryRange: '',
    profile: {},
    jobs: [],
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobs()
  }

  getProfileDetails = async () => {
    this.setState({profileApiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const profileUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(profileUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const profileDetails = fetchedData.profile_details
      const updatedProfileDetails = {
        profileImageUrl: profileDetails.profile_image_url,
        name: profileDetails.name,
        shortBio: profileDetails.short_bio,
      }
      this.setState({
        profileApiStatus: apiStatusConstants.success,
        profile: updatedProfileDetails,
      })
    } else if (response.status === 401) {
      this.setState({profileApiStatus: apiStatusConstants.failure})
    }
  }

  getJobs = async () => {
    this.setState({jobsApiStatus: apiStatusConstants.inProgress})
    const {activeEmploymentType, searchText, salaryRange} = this.state
    let employmentType = ''
    if (activeEmploymentType.length !== 0) {
      employmentType = activeEmploymentType.join(',')
    }
    const jwtToken = Cookies.get('jwt_token')
    const jobsUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${salaryRange}&search=${searchText}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobsUrl, options)
    if (response.ok === true) {
      const fetchedJobsData = await response.json()
      const {jobs} = fetchedJobsData
      const updatedJobsData = jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsApiStatus: apiStatusConstants.success,
        jobs: updatedJobsData,
      })
    } else if (response.status === 401) {
      this.setState({jobsApiStatus: apiStatusConstants.failure})
    }
  }

  onSubmitSearchText = () => {
    this.getJobs()
  }

  onChangeSearchInput = event => {
    this.setState({searchText: event.target.value}, this.getJobs)
  }

  onChangeEmploymentType = event => {
    const {activeEmploymentType} = this.state
    const changedElId = event.target.id
    const isActive = activeEmploymentType.includes(changedElId)
    if (isActive === true) {
      const updatedEmploymentType = activeEmploymentType.filter(
        eachType => eachType !== changedElId,
      )
      return this.setState(
        {activeEmploymentType: updatedEmploymentType},
        this.getJobs,
      )
    }
    const updatedEmploymentType = [...activeEmploymentType, changedElId]
    return this.setState(
      {activeEmploymentType: updatedEmploymentType},
      this.getJobs,
    )
  }

  onChangeSalaryRange = event => {
    this.setState({salaryRange: event.target.id}, this.getJobs)
  }

  onProfileRetry = () => {
    this.getProfileDetails()
  }

  onJobsRetry = () => {
    this.getJobs()
  }

  renderSearchBox = () => {
    const {searchText} = this.state
    return (
      <div className="search-container">
        <input
          type="search"
          value={searchText}
          className="search-input"
          placeholder="Search"
          onChange={this.onChangeSearchInput}
        />
        <button
          type="button"
          className="search-btn"
          testid="searchButton"
          onClick={this.onSubmitSearchText}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  renderProfileSuccessView = () => {
    const {profile} = this.state
    const {name, shortBio, profileImageUrl} = profile
    return (
      <div className="profile-sm-container">
        <img src={profileImageUrl} alt="profile" className="profile-image" />
        <p className="name">{name}</p>
        <p className="short-bio">{shortBio}</p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileFailureView = () => (
    <div className="profile-failure-view-container">
      <button
        type="button"
        className="profile-retry-btn"
        onClick={this.onProfileRetry}
      >
        Retry
      </button>
    </div>
  )

  renderProfileContainer = () => {
    const {profileApiStatus} = this.state
    switch (profileApiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileSuccessView()
      case apiStatusConstants.failure:
        return this.renderProfileFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderNoJobsView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="failure-view-image"
      />
      <p className="failure-title">No Jobs Found</p>
      <p className="failure-msg">
        We could not find any jobs. Try other filters.
      </p>
    </>
  )

  renderJobsSuccessView = () => {
    const {jobs} = this.state
    if (jobs.length !== 0) {
      return jobs.map(eachJob => <JobCard key={eachJob.id} jobItem={eachJob} />)
    }
    return this.renderNoJobsView()
  }

  renderJobsFailureView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view-image"
      />
      <p className="failure-title">Oops! Something Went Wrong</p>
      <p className="failure-msg">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="profile-retry-btn"
        onClick={this.onJobsRetry}
      >
        Retry
      </button>
    </>
  )

  renderJobsContainer = () => {
    const {jobsApiStatus} = this.state
    switch (jobsApiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsSuccessView()
      case apiStatusConstants.failure:
        return this.renderJobsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderTypeofEmploymentFilter = () => (
    <div className="filter-container">
      <p>Type of Employment</p>
      {employmentTypesList.map(eachType => {
        const {employmentTypeId, label} = eachType
        return (
          <div className="filter-item-container">
            <input
              type="checkbox"
              id={employmentTypeId}
              className="input-checkbox"
              onChange={this.onChangeEmploymentType}
            />
            <label className="filter-label">{label}</label>
          </div>
        )
      })}
    </div>
  )

  renderSalaryRangeFilter = () => (
    <div className="filter-container">
      <p>Salary Range</p>
      {salaryRangesList.map(eachRange => {
        const {salaryRangeId, label} = eachRange
        return (
          <div className="filter-item-container">
            <input
              type="radio"
              id={salaryRangeId}
              className="input-checkbox"
              name="salaryRange"
              onChange={this.onChangeSalaryRange}
            />
            <label className="filter-label">{label}</label>
          </div>
        )
      })}
    </div>
  )

  render() {
    return (
      <>
        <Header />
        <div className="jobs-section-sm-container">
          {this.renderSearchBox()}
          {this.renderProfileContainer()}
          {this.renderTypeofEmploymentFilter()}
          {this.renderSalaryRangeFilter()}
          <ul className="jobs-container">{this.renderJobsContainer()}</ul>
        </div>
        <div className="jobs-section-md-container">
          <div className="profile-filter-md-container">
            {this.renderProfileContainer()}
            {this.renderTypeofEmploymentFilter()}
            {this.renderSalaryRangeFilter()}
          </div>
          <div className="search-jobs-md-container">
            {this.renderSearchBox()}
            <ul className="jobs-container">{this.renderJobsContainer()}</ul>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
