import React, { Component } from 'react';
import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service'
import "./LoginForm.css"


export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            username: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitJwtAuth = this.handleSubmitJwtAuth.bind(this);
    }

    // invoked by handleSubmitBasicAuth
    static defaultProps = {
        onLoginSuccess: () => { }
    }

    // invoked after form inputs are validated
    handleSubmitJwtAuth = ev => {

        ev.preventDefault();

        // updates state.error
        this.setState({ error: null });

        //deconstruct form values into variables
        const { username, password } = ev.target;
        // A fetch call is made to the server from this method @ line 4/AuthApiService.js to /auth/login endpoint in the server
        AuthApiService.postLogin({
            username: username.value,
            password: password.value
        })

            // form values are cleared, token is saved 
            .then(res => {
                username.value = '';
                password.value = '';
                TokenService.saveAuthToken(res.authToken);
                this.props.onLoginSuccess();

            })

            // updates form state.error if login fails
            .catch(res => {
                this.setState({ error: res.error });
            });
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }


    // render LoginForm component
    render() {

        // destructure the state into "error" variable
        const { error } = this.state

        // return LoginForm (JSX)html
        return (
            <React.Fragment>
                <section className="section section-grid">
                    {/* spacer */}
                    <div className="section-grid-item"></div>
                    <div className="section-grid-item">
                        <h2>Login</h2>
                        <p>Username:"demo1234"</p>
                        <p>Pass:"Demo1234!"</p>
                        <form id="login-form"
                            onSubmit={this.handleSubmitJwtAuth}>
                            <div className="form-top">
                                <p>LOGIN</p>
                            </div>
                            <div role='alert'>
                                {error && <p className='red'>{error}</p>}
                            </div>

                                <label htmlFor='login_user_name'>
                                <input
                                        name='username'
                                        id='login_user_name'
                                        aria-label= 'login_user_name'
                                        aria-required="true"
                                        placeholder="Username(Required)"
                                        className="text"
                                        value={this.state.username}
                                        onChange={(ev) => this.handleChange(ev)}
                                        autoComplete="username"
                                    >
                                    </input>
                                </label>

                                <label htmlFor='login_password'>
                                <input
                                        name='password'
                                        type='password'
                                        id="login_password"
                                        aria-label= 'login_password'
                                        aria-required="true"
                                        placeholder="Password(Required)"
                                        className="text"
                                        value={this.state.password}
                                        onChange={(ev) => this.handleChange(ev)}
                                        autoComplete="current-password"
                                    >
                                    </input>
                                </label>
                            <button className="btn submit_btn" type='submit'>
                                SUBMIT
                            </button>
                        </form>
                    </div>
                </section>
            </React.Fragment >
        )
    }
}