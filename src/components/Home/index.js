import './index.css'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

const Home = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }
  const token = Cookies.get('jwt_token')
  if (token === undefined) {
    return <Redirect to="/ebank/login" />
  }

  return (
    <div className="home-container">
      <div className="logo-logout-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
          className="website-logo"
        />
        <button type="button" className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
      <h1 className="home-heading">Your Flexibility, Our Excellence</h1>
      <img
        src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
        alt="digital card"
        className="digital-card"
      />
    </div>
  )
}

export default Home
