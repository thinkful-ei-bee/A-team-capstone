import React from 'react';
import TipBox from "../TipBox/TipBox";
import AccountPanel from "../AccountPanel/AccountPanel";

export default class SideBar extends React.Component {

    render() {
        return (
            <aside className="sidebar">
                <AccountPanel updateBids={this.props.updateBids}></AccountPanel>
                <TipBox></TipBox>
            </aside>
        )
    }
}