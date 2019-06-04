import React, { Component } from 'react';
import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service'
import "./LoginForm.css"


export default class LoginForm extends Component {

    // invoked by handleSubmitBasicAuth
    static defaultProps = {
        onLoginSuccess: () => { }
    }

    //   manages form state
    state = { error: null }

    // invoked after form inputs are validated
    handleSubmitJwtAuth = ev => {

        ev.preventDefault();

        // updates state.error
        this.setState({ error: null });

        //deconstruct form values into variables
        const { user_name, password } = ev.target;

        // A fetch call is made to the server from this method @ line 4/AuthApiService.js to /auth/login endpoint in the server
        AuthApiService.postLogin({
            user_name: user_name.value,
            password: password.value
        })

            // form values are cleared, token is saved 
            .then(res => {
                user_name.value = '';
                password.value = '';
                TokenService.saveAuthToken(res.authToken);
                this.props.onLoginSuccess();

            })

            // updates form state.error if login fails
            .catch(res => {
                this.setState({ error: res.error });
            });
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
                        <form id="contact-form"
                            onSubmit={this.handleSubmitJwtAuth}>
                            <div role='alert'>
                                {error && <p className='red'>{error}</p>}
                            </div>
                            <div className='user_name'>
                                <input
                                    name='user_name'
                                    id='LoginForm__user_name'
                                    required
                                    placeholder="Username(Required)">
                                </input>
                            </div>
                            <div className='password'>
                                <input
                                    name='password'
                                    type='password'
                                    required
                                    id='LoginForm__password'
                                    placeholder="Password(Required)">
                                </input>
                            </div>
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