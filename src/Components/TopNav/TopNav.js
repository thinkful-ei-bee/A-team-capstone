import React from "react";
import { Link } from "react-router-dom";
import HamburgerButton from "../HamburgerButton/HamburgerButton";
import "./TopNav.css";
import NavMenu from "../NavMenu/NavMenu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMitten } from '@fortawesome/free-solid-svg-icons'

class TopNav extends React.Component {

    render() {
        const mitten = <FontAwesomeIcon icon={faMitten} className=" thumbsUp fa-4x" />
        return (
            <nav className="top-nav">
                <div className="nav-grid">
                    <div className="nav-grid-item">
                        <Link to={'/'} id="logo">
                            <h1><span>{mitten}Bid</span>Hub</h1>
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
