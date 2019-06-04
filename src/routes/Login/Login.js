import React, { Component} from 'react'
import LoginForm from '../../Components/LoginForm/LoginForm'

class Login extends Component {

  static defaultProps = {
    location: {},
    history: {
      push: () => { },
    },
  }

  // Fires success messages and re-routes user
  handleLoginSuccess = () => {
    alert("Logged in successfully")
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/'
    history.push(destination)
  }

  // renders LoginPage component
  render() {

    // returns LoginPage html(JSX)
    return (
      <section className='LoginPage'>
        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
        />
      </section>
    )
  }
}

export default Login