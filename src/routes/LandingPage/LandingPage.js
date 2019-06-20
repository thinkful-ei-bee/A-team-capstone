import React from 'react';
import AuthApiService from '../../services/auth-api-service';
import Footer from "../../Components/Footer/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMitten } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

export default class LandingPage extends React.Component {

    state = {
        error: null,
        username: '',
        password: '',
        email: '',
        image: '',
        user_description: ''
    };

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
                    this.props.history.push('/login');
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
        const mitten = <FontAwesomeIcon icon={faMitten} className="thumbsUp" style={{ fontSize: "30px" }} />
        return (
            <div>
                <section id="landing_banner">
                    <article className="overlay">
                        <article>
                            {mitten}
                            <h1><span style={{ color: "red" }}>Bid</span>Hub</h1>
                            <p>
                                Where Professional Developers Meet To Colaborate On Projects and Create The Web!
                            </p>
                        </article>
                        <Link to="/register">
                            <button className="btn">EXPLORE BIDHUB</button>
                        </Link>


                    </article>
                </section>
                <section id="landing_content" className="landing-content-grid">
                    <div id="landing-content-left" className="landing-content-grid-item">
                        <p className="landing-content-header">Sign Up today and get full access to exclusive features, like bidding, and creating projects to be bid on!</p>
                        <img id="cellphone" src="https://i.imgur.com/RYZDtjt.png" alt="app on mobile device"></img>
                    </div>
                    <div className="landing-content-grid-item"><form id="landing-form" onSubmit={this.handleSubmit}>
                        <div className="form-top">
                            <p>SIGN-UP</p>
                        </div>
                        <div className='form-error' role='alert'>
                            {error && <p className='red'>{error}</p>}
                        </div>
                        <div className='username'>
                            <label htmlFor='registration-user-name'>
                                <input
                                    name='username'
                                    type='text'
                                    required
                                    id='registration-user-name'
                                    aria-label='registration-user-name'
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
                                    id="registration-image"
                                    aria-label="registration-image"
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
                            <label htmlFor='registration-email'>
                                <input
                                    name='email'
                                    id='registration-email'
                                    aria-label="registration-email"
                                    type='email'
                                    required
                                    placeholder="Email(Required)"
                                    className="text"
                                    value={this.state.email}
                                    onChange={(ev) => this.handleChange(ev)}
                                >
                                </input>
                            </label>

                        </div>
                        <div className='user_description'>
                            <label htmlFor='registration_user_desc'>
                                <textarea
                                    name='user_description'
                                    id='registration_user_desc'
                                    aria-label='registration_user_desc'
                                    type='text'
                                    required
                                    placeholder="Your Experience/Credentials"
                                    className="text"
                                    value={this.state.user_description}
                                    onChange={(ev) => { this.handleChange(ev) }}
                                >
                                </textarea>
                            </label>
                        </div>
                        <div className='password'>
                            <label htmlFor='registration-password'>
                                <input
                                    name='password'
                                    id='registration-password'
                                    aria-label='registration-password'
                                    type='password'
                                    required
                                    placeholder="Password(Required)"
                                    className="text"
                                    value={this.state.password}
                                    onChange={ev => this.handleChange(ev)}
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
                
                <Footer></Footer>
            </div>
        )
    }
}