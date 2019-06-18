import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMitten } from '@fortawesome/free-solid-svg-icons'
import Logo from "../Logo/Logo";
export default class Footer extends React.Component {

    render() {
        const mitten = <FontAwesomeIcon icon={faMitten} className=" thumbsUp fa-4x" />
        return (
            <section id="footer" className=" stats-grid">
                {/* <header class="item1"><h2>APP STATS</h2></header > */}
                <article className="item2 stats-grid-item">
                    <Logo></Logo>
                </article>
                <article className="item3 stats-grid-item">

                </article>
                <article className="item4 stats-grid-item">

                </article>
            </section>
        )
    }
}