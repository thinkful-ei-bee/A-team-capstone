import React from "react";
import { Link } from "react-router-dom";
import HamburgerButton from "../HamburgerButton/HamburgerButton";
import TokenService from '../../services/token-service';
import "./TopNav.css";
import NavMenu from "../NavMenu/NavMenu";

class TopNav extends React.Component {

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
                        <NavMenu swapOpen={this.props.swapOpen}></NavMenu>
                        <HamburgerButton swapOpen={this.props.swapOpen} />
                    </div>
                </div>
                {/* End of nav-grid */}
            </nav>
        );
    }
}

export default TopNav;
