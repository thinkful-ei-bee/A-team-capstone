import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMitten } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

export default class Logo extends React.Component {

    render() {
        const mitten = <FontAwesomeIcon icon={faMitten} className=" thumbsUp fa-4x" />
        return (
            <Link to={'/'} id="logo-footer">
                <h1><span style={{ color: "red" }}>{mitten}Bid</span>Hub</h1>
            </Link>
        )
    }
}