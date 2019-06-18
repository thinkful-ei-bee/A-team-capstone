import React from 'react';
import AuthApiService from '../../services/auth-api-service';

class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            username: '',
            password: '',
            email: '',
            image: '',
            user_description: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static defaultProps = {
        onRegistrationSuccess: () => { }
    }

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

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        let { error } = this.state;
        return (
            <React.Fragment>
                <div>
                    <section className="section">
                        {/* <div className="section-grid-item"></div> */}
                        <div className="section-grid-item">
                            <h2>Sign Up To Use Our App</h2>
                            <form id="contact-form" onSubmit={this.handleSubmit}>
                                <div className="form-top">
                                    <p>REGISTER</p>
                                </div>
                                <div role='alert'>
                                    {error && <p className='red'>{error}</p>}
                                </div>
                                <div className='username'>
                                    <label htmlFor='regeistration-user-name'>
                                        <input
                                            name='username'
                                            type='text'
                                            aria-label='regeistration-user-name'
                                            aria-required="true"
                                            id='registration-user-name'
                                            placeholder="Username(Required)"
                                            className="text"
                                            value={this.state.username}
                                            onChange={(ev) => this.handleChange(ev)}
                                        >
                                        </input>
                                    </label>
                                </div>
                                <div className='image'>
                                    <label htmlFor='registration-image'>
                                        <input
                                            name='image'
                                            aria-label='registration-image'
                                            type='text'
                                            placeholder="User Profile Image"
                                            className="text"
                                            value={this.state.image}
                                            onChange={(ev) => this.handleChange(ev)}
                                        >
                                        </input>
                                    </label>

                                </div>
                                <div className='email'>
                                    <label htmlFor='registration-user-email'>
                                        <input
                                            name='email'
                                            id='registration-email'
                                            type='email'
                                            aria-label='registration-user-email'
                                            aria-required="true"
                                            placeholder="Email(Required)"
                                            className="text"
                                            value={this.state.email}
                                            onChange={(ev) => this.handleChange(ev)}
                                        >
                                        </input>
                                    </label>

                                </div>
                                <div className='user_description'>
                                    <label htmlFor='registration-user-desc'>
                                        <textarea
                                            name='user_description'
                                            id='registration_user_desc'
                                            type='text'
                                            aria-label='registration-user-desc'
                                            aria-required="true"
                                            placeholder="Your Experience/Credentials"
                                            className="text"
                                            value={this.state.user_description}
                                            onChange={(ev) => this.handleChange(ev)}
                                        >
                                        </textarea>
                                    </label>
                                </div>
                                <div className='password'>
                                    <label htmlFor='registration-password'>
                                        <input
                                            name='password'
                                            id='registration-password'
                                            type='password'
                                            aria-label='registration-password'
                                            aria-required="true"
                                            placeholder="Password(Required)"
                                            className="text"
                                            value={this.state.password}
                                            onChange={(ev) => this.handleChange(ev)}
                                        >
                                        </input>
                                    </label>

                                </div>
                                <button className="btn submit_btn" type='submit'>
                                    SUBMIT
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
