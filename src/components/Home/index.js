import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="bg-container">
      <div className="home-content-container">
        <h1 className="home-heading">Find the job that fits your life</h1>
        <p className="home-description">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button type="button" className="home-btn">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default Home
