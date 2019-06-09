import React from 'react';

export default class LandingPage extends React.Component {

    handleSubmit = ev => {

    }

    handleChange = ev => {

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
                        <img id="cellphone" src="https://i.imgur.com/qb6G69D.png"></img>
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
                                value=""
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
                            >
                            </input>
                        </div>
                        <button className="btn submit_btn" type='submit'>
                            SUBMIT
                        </button>
                    </form>
                    </div>
                </section>
                <section id="stats" className=" stats-grid">
                    {/* <header class="item1"><h2>APP STATS</h2></header > */}
                    <article className="item2 stats-grid-item">
                    <h1><span style={{ color: "red" }}>Bid</span>Hub</h1>
                    </article>
                    <article className="item3 stats-grid-item">
                        
                    </article>
                    <article className="item4 stats-grid-item">
                
                    </article>
                </section>
            </div>
        )
    }
}