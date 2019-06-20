import React from 'react';
import Logo from "../Logo/Logo";
export default class Footer extends React.Component {

    render() {
        return (
            <section id="footer" className=" stats-grid">
                {/* <header class="item1"><h2>APP STATS</h2></header > */}
                <article className="item2 stats-grid-item">
                © 2019 <span>Bid</span>Hub, All Rights Reserved.
                </article>
                <article className="item4 stats-grid-item-last">
                <Logo id ='-footer'></Logo>
                </article>
            </section>
        )
    }
}