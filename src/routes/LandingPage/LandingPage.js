import React from 'react';
import AuthApiService from '../../services/auth-api-service';
import Footer from "../../Components/Footer/Footer";

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

        return (
            <div>
                <section id="landing_banner">
                    <article className="overlay">
                        <article>
                            <h1><span style={{ color: "red" }}>Bid</span>Hub</h1>
                            <p>
                                Where Professional Developers Meet To Colaborate On Projects and Create The Web!
                            </p>
                        </article>
                        <button className="">EXPLORE BIDHUB</button>

                    </article>
                </section>
                <section id="landing_content" className="landing-content-grid">
                    <div id="landing-content-left" className="landing-content-grid-item">
                        {/* <header id="landing-content-header"> */}
                        <p className="landing-content-header">Sign Up today and get full access to exclusive features, like bidding, and creating projects to be bid on!</p>
                        <img id="cellphone" src="https://i.imgur.com/qb6G69D.png" alt="app on mobile device"></img>
                    </div>
                    <div className="landing-content-grid-item"><form id="landing-form" onSubmit={this.handleSubmit}>
                        <div className="form-top">
                            <p>SIGN-UP</p>
                        </div>
                        <div role='alert'>
                            {/* {error && <p className='red'>{error}</p>} */}
                        </div>
                        <div className='username'>
                            <label htmlFor='regeistration-user-name'>Username</label>
                            <input
                                name='username'
                                type='text'
                                required
                                id='registration-user-name'
                                placeholder="Username(Required)"
                                className="text"
                                value={this.state.username}
                                onChange={(ev) => this.handleChange(ev)}
                            >
                            </input>
                        </div>
                        <div className='image'>
                            <label htmlFor='registration-image'>Image URL</label>
                            <input
                                name='image'
                                id=""
                                type='text'
                                placeholder="User Profile Image"
                                className="text"
                                value={this.state.image}
                                onChange={(ev) => this.handleChange(ev)}
                            >
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
                                className="text"
                                value={this.state.email}
                                onChange={(ev) => this.handleChange(ev)}
                            >
                            </input>
                        </div>
                        <div className='user_description'>
                            <label htmlFor='registration-user-desc'>Describe Your Experience</label>
                            <textarea
                                name='user_description'
                                id='registration_user_desc'
                                type='text'
                                required
                                placeholder="Your Experience/Credentials"
                                className="text"
                                value={this.state.user_description}
                                onChange={(ev) => {this.handleChange(ev)}}
                            >
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
                                className="text"
                                value={this.state.password}
                                onChange={ev => this.handleChange(ev)}
                            >
                            </input>
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