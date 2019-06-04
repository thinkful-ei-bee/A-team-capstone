import React from 'react';
import AuthApiService from '../../services/auth-api-service';

class RegistrationForm extends React.Component {

    static defaultProps = {
        onRegistrationSuccess: () => { }
    }

    state = { error: null }

    handleSubmit = ev => {
        ev.preventDefault()
        const { email, username, password, image, user_description } = ev.target
        
        this.setState({ error: null })
        AuthApiService.postUser({
            username: username.value,
            password: password.value,
            email: email.value,
            image: image.value,
            user_description: user_description.value
        })
            .then(user => {
                email.value = ''
                username.value = ''
                password.value = ''
                image.value = ''
                user_description.value = ''
                if (this.state.error === null) {
                    this.props.onRegistrationSuccess()
                }
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }

    render() {
        let { error } = this.state;
        return (
            <React.Fragment>
                <div>
                    <section className="section ">
                        {/* <div className="section-grid-item"></div> */}
                        <div className="section-grid-item">
                            <h2>Sign Up To Use Our App</h2>
                            <form id="contact-form" onSubmit={this.handleSubmit}>
                                <div role='alert'>
                                    {error && <p className='red'>{error}</p>}
                                </div>
                                <div className='username'>
                                <label htmlFor='regeistration-user-name'>Username</label>
                                    <input
                                        name='username'
                                        type='text'
                                        required
                                        id='registration-user-name'
                                        placeholder="Username(Required)"
                                        className="text">
                                    </input>
                                </div>
                                <div className='image'>
                                <label htmlFor='registration-image'>Image URL</label>
                                    <input
                                        name='image'
                                        id=""
                                        type='text'
                                        placeholder="User Profile Image"
                                        className="text">
                                    </input>
                                </div>
                                <div className='email'>
                                <label htmlFor='registration-user-email'>Email</label>
                                    <input
                                        name='email'
                                        id='registration-email'
                                        type='email'
                                        required
                                        placeholder="Email(Required)"
                                        className="text">
                                    </input>
                                </div>
                                <div className='user_description'>
                                <label htmlFor='registration-user-desc'>Describe Your Experience</label>
                                    <textarea
                                        name='user_description'
                                        id='registration-user-desc'
                                        type='text'
                                        required
                                        placeholder="Your Experience/Credentials"
                                        className="text">
                                    </textarea>
                                </div>
                                <div className='password'>
                                <label htmlFor='registration-password'>Password</label>
                                    <input
                                        name='password'
                                        id='registration-password'
                                        type='password'
                                        required
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
