import './index.css'
import Cookies from 'js-cookie'
import {Component} from 'react'

class Login extends Component {
  state = {userId: '', pin: '', showSubmitError: false, errorMessage: ''}

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 2})
    history.replace('/')
  }

  onSubmitError = errorMsg => {
    this.setState({errorMessage: errorMsg, showSubmitError: true})
  }

  onSubmitUserDetails = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {user_id: userId, pin}
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitError(data.error_msg)
    }
  }

  render() {
    const {userId, pin, showSubmitError, errorMessage} = this.state

    return (
      <div className="ebank-container">
        <div className="logo-login-container">
          <div className="web-design-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="website-login"
            />
            <form className="login-profile" onSubmit={this.onSubmitUserDetails}>
              <h1 className="heading">Welcome Back!</h1>
              <div className="user-id-container">
                <label htmlFor="userId" className="label">
                  User ID
                </label>
                <input
                  id="userId"
                  type="text"
                  className="input"
                  value={userId}
                  placeholder="Enter User ID"
                  onChange={this.onChangeUserId}
                />
              </div>
              <div className="user-id-container">
                <label htmlFor="pin" className="label">
                  PIN
                </label>
                <input
                  id="pin"
                  type="password"
                  className="input"
                  value={pin}
                  placeholder="Enter PIN"
                  onChange={this.onChangePin}
                />
              </div>
              <button type="submit" className="login-button">
                Login
              </button>
              {showSubmitError && (
                <p className="error-message">{errorMessage}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
