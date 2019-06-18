import React from 'react';
import RegistrationForm from '../../Components/RegistrationForm/RegistrationForm';
import Footer from '../../Components/Footer/Footer';
class Registration extends React.Component {

    static defaultProps = {
        history: {
            push: () => { },
        },
    }

    handleRegistrationSuccess = () => {
        const { history } = this.props
        history.push('/login')
    }

    render() {
        return (
            <section className='RegistrationPage'>
                <RegistrationForm
                    onRegistrationSuccess={this.handleRegistrationSuccess}
                />
                <Footer></Footer>
            </section>
        )
    }
}

export default Registration;