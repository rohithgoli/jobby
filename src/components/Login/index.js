import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookie from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showErrorMsg: false, errorMsg: ''}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookie.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, showErrorMsg: true})
  }

  onLoginFormSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <div className="form-field-container">
        <label htmlFor="username" className="form-label">
          username
        </label>
        <input
          type="text"
          placeholder="Username"
          className="form-input"
          id="username"
          onChange={this.onChangeUsername}
          value={username}
        />
      </div>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <div className="form-field-container">
        <label htmlFor="password" className="form-label">
          password
        </label>
        <input
          type="password"
          placeholder="Password"
          className="form-input"
          id="password"
          onChange={this.onChangePassword}
          value={password}
        />
      </div>
    )
  }

  render() {
    const {errorMsg, showErrorMsg} = this.state
    const jwtToken = Cookie.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <div className="login-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="form-logo"
          />
          <form className="login-form" onSubmit={this.onLoginFormSubmit}>
            {this.renderUsernameField()}
            {this.renderPasswordField()}
            <button type="submit" className="login-btn">
              Login
            </button>
            {showErrorMsg && <p className="error-msg">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
