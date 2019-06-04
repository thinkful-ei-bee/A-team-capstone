import React from 'react';
import AuthApiService from '../../services/auth-api-service';

class RegistrationForm extends React.Component {

    static defaultProps = {
        onRegistrationSuccess: () => { }
    }

    state = { error: null }

    handleSubmit = ev => {
        ev.preventDefault()
        const { email, user_name, password, image, user_desc } = ev.target

        this.setState({ error: null })
        AuthApiService.postUser({
            user_name: user_name.value,
            password: password.value,
            email: email.value,
            image: image.value,
            user_desc: user_desc.value
        })
            .then(user => {
                email.value = ''
                user_name.value = ''
                password.value = ''
                if (this.state.error === null) {
                    this.props.onRegistrationSuccess()
                }
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }

    render() {
        const { error } = this.state;
        return (
            <React.Fragment>
                <div>
                    <section className="section section-grid">
                        <div className="section-grid-item"></div>
                        <div className="section-grid-item">
                            <h2>Sign Up To Use Our App</h2>
                            <form id="contact-form" onSubmit={this.handleSubmit}>
                                <div role='alert'>
                                    {error && <p className='red'>{error}</p>}
                                </div>
                                <div className='user_name'>
                                    <input
                                        name='user_name'
                                        type='text'
                                        required
                                        id='RegistrationForm__user_name'
                                        placeholder="Username(Required)"
                                        className="text">
                                    </input>
                                </div>
                                <div className='image'>
                                    <input
                                        name='image'
                                        type='text'
                                        placeholder="User Profile Image"
                                        className="text">
                                    </input>
                                </div>
                                <div className='email'>
                                    <input
                                        name='email'
                                        type='email'
                                        required
                                        id='RegistrationForm__email'
                                        placeholder="Email(Required)"
                                        className="text">
                                    </input>
                                </div>
                                <div className='user-desc'>
                                    <input
                                        name='user-desc'
                                        type='text'
                                        required
                                        placeholder="Your Experience/Credentials"
                                        className="text">
                                    </input>
                                </div>
                                <div className='password'>
                                    <input
                                        name='password'
                                        type='password'
                                        required
                                        id='RegistrationForm__password'
                                        placeholder="Password(Required)"
                                        className="text">
                                    </input>
                                </div>
                                <button className="btn submit_btn" type='submit'>
                                    Register
                                </button>
                            </form>
                        </div>
                    </section>
                </div>
            </React.Fragment>
        );
    }
}

export default RegistrationForm;
