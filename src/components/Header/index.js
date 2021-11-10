import {Link, withRouter} from 'react-router-dom'
import Cookie from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onLogout = () => {
    Cookie.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="nav-header-container">
      <div className="nav-content-sm-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="website-logo"
            alt="website logo"
          />
        </Link>
        <ul className="nav-menu-container">
          <Link to="/">
            <li>
              <AiFillHome className="nav-link" />
            </li>
          </Link>
          <li>
            <BsBriefcaseFill className="nav-link" />
          </li>
          <li onClick={onLogout}>
            <FiLogOut className="nav-link" />
          </li>
        </ul>
      </div>
      <div className="nav-content-md-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </Link>
        <ul className="nav-menu-container">
          <Link to="/">
            <li className="nav-link-md">Home</li>
          </Link>
          <Link to="/jobs">
            <li className="nav-link-md">Jobs</li>
          </Link>
        </ul>
        <button type="button" className="logout-btn-md" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}
export default withRouter(Header)
