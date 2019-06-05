import React from "react";
import { Link } from "react-router-dom";
import HamburgerButton from "../HamburgerButton/HamburgerButton";
import TokenService from '../../services/token-service';

import "./TopNav.css";

class TopNav extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }


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
        return (
            <nav className="top-nav">
                <div className="nav-grid">
                    <div className="nav-grid-item">
                        <Link to={'/'} id="logo">
                            <h1>BidHub</h1>
                        </Link>
                    </div>
                    <div className="nav-grid-item-2">
                        {/* Hamburger menu button renders when screen < 678px */}
                        <HamburgerButton />
                        {
                            TokenService.hasAuthToken()
                            ? this.renderLogOutLink()
                            : this.renderLoginLink()
                        }

                    </div>
                </div>
                {/* End of nav-grid */}
            </nav>
        );
    }
}

export default TopNav;
