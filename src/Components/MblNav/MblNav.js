import React from 'react';
import TipBox from "../TipBox/TipBox";
import AccountPanel from "../AccountPanel/AccountPanel";
import NavMenu from "../NavMenu/NavMenu";
import Logo from "../Logo/Logo";

export default class MblNav extends React.Component {
    render() {
        const open = (!this.props.open && 'invisible') || '';
        return (
            <aside id="mbl-nav" className={open}>
                {/* <Logo></Logo> */}
                <NavMenu swapOpen={this.props.swapOpen}></NavMenu>
                <AccountPanel></AccountPanel>
                <TipBox></TipBox>
            </aside>
        )
    }

}
