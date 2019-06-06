import React from 'react';
import TipBox from "../TipBox/TipBox";
import AccountPanel from "../AccountPanel/AccountPanel";

export default class MblNav extends React.Component {
    render() {
        const open = (!this.props.open && 'invisible') || '';
        return (
            <aside id="mbl-nav" className={open}>
                <AccountPanel></AccountPanel>
                <TipBox></TipBox>
            </aside>
        )
    }
   
}
