import React from "react";
import { Link } from "react-router-dom";
// import HamburgerBtn from "../HamburgerBtn/HamburgerBtn";
import TokenService from '../../services/token-service';
import "./TopNav.css";

class TopNav extends React.Component {

    // TopNav constructor
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    // End of TopNav constructo

    // logout
    handleLogoutClick = () => {
        alert("Logged Out Successfully!!!")
        TokenService.clearAuthToken();
        // localStorage.clear();
    }

    // renders if user is  logged out
    renderLoginLink() {
        return (
            <ul className='nav-menu'>
                <li>
                    <Link
                        to='/register'>
                        Register
                    </Link>
                </li>
                <li>
                    <Link
                        to='/login'>
                        Log in
                    </Link>
                </li>
            </ul>
        )
    }

    //renders if user is  logged in
    renderLogOutLink() {
        return (
            <ul className='nav-menu'>
                <li>
                    <Link
                        className="login-logout"
                        onClick={this.handleLogoutClick}
                        to='/login'>
                        Logout
                    </Link>
                </li>
                <li>
                    <Link
                        className="nav-btn"
                        to='/new-project'>
                        NEW PROJECT
                    </Link>
                </li>
            </ul>
        )
    }

    render() {
         //
        // returns TopNav html(JSX)
        return (
            <nav className="top-nav">

                {/* nav-grid */}
                <div className="nav-grid">

                    {/* nav-grid item */}
                    <div className="nav-grid-item">
                        <Link to={'/'} id="logo">
                            <h1>Capstone</h1>
                        </Link>
                    </div>

                    {/* nav-grid item */}
                    <div className="nav-grid-item-2">
                        {/* Hamburger menu button renders when screen < 678px */}
                        {/* <HamburgerBtn click={this.props.hamburgerClick} /> */}

                        {/* Post Categories drop down */}

                        {/*renders login and register links to <TopNav/> if user is  logged out*/}

                        {
                            TokenService.hasAuthToken()
                            ? this.renderLogOutLink()
                            : this.renderLoginLink()
                        }

                        {/* End of Post Dropdown */}

                    </div>
                </div>
                {/* End of nav-grid */}
            </nav>
        );
    }
}

export default TopNav;
