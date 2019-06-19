import React from 'react';
import TipBox from "../TipBox/TipBox";
import AccountPanel from "../AccountPanel/AccountPanel";

export default class SideBar extends React.Component {

    render() {
        return (
            <section className="sidebar">
                <AccountPanel updateBids={this.props.updateBids}></AccountPanel>
                <TipBox></TipBox>
            </section>
        )
    }
}