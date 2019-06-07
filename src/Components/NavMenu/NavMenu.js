import React from "react";
import { Link } from "react-router-dom";
import TokenService from '../../services/token-service';

import "../TopNav/TopNav.css";

class NavMenu extends React.Component {
    
    state = { hasToken: TokenService.hasAuthToken() };

    componentDidMount() {
        this.setState({
            hasToken: TokenService.hasAuthToken()
        });
    }

    componentWillReceiveProps() {
        this.setState({
            hasToken: TokenService.hasAuthToken()
        });
    }

    // logout
    handleLogoutClick = () => {
        alert("Logged Out Successfully!!!")
        TokenService.clearAuthToken();
        this.setState({
            hasToken: false
        })
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
                        <span>+</span> PROJECT
                    </Link>
                </li>
            </ul>
        )
    }

    render() {
        return (
            <nav className="nav-nav">
                
                        {/* Hamburger menu button renders when screen < 678px */}
                        
                        {
                            TokenService.hasAuthToken()
                            ? this.renderLogOutLink()
                            : this.renderLoginLink()
                        }
                   
            </nav>
        );
    }
}

export default NavMenu;
