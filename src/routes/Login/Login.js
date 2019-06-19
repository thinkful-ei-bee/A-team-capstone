import React, { Component} from 'react'
import LoginForm from '../../Components/LoginForm/LoginForm'
import Footer from '../../Components/Footer/Footer';

class Login extends Component {

  static defaultProps = {
    location: {},
    history: {
      push: () => { },
    },
  }

  // Fires success messages and re-routes user
  handleLoginSuccess = () => {
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
        <Footer></Footer>
      </section>
    )
  }
}

export default Login