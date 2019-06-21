import React from 'react';
import Logo from "../Logo/Logo";
export default class Footer extends React.Component {

    render() {
        return (
            <section id="footer" className=" footer-grid">
                {/* <header class="item1"><h2>APP STATS</h2></header > */}
                <article className="f-grid-item-1">
                © 2019 <span>Bid</span>Hub, All Rights Reserved.
                </article>
                <article className="f-grid-item-2">
                <Logo id ='-footer'></Logo>
                </article>
                <article className="f-grid-item-3">
                <Logo id ='-footer'></Logo>
                </article>
                <article className="f-grid-item-4">
                © 2019 <span>Bid</span>Hub, All Rights Reserved.
                </article>
                
            </section>
        )
    }
}