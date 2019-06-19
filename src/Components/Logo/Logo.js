import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMitten } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

export default class Logo extends React.Component {

    render() {
        const mitten = <FontAwesomeIcon icon={faMitten} className=" thumbsUp fa-4x" />
        return (
<<<<<<< HEAD
            <Link to={'/'} id="logo-footer">
                <h1><span style={{ color: "red" }}>{mitten}Bid</span>Hub</h1>
=======
            <Link to={'/'} id="logo">
                <h1><span>{mitten}Bid</span>Hub</h1>
>>>>>>> 1db8f1e3adb828a0bade57df2c55dc203b84e4c6
            </Link>
        )
    }
}