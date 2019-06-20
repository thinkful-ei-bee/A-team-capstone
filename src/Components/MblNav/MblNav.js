import React from 'react';
import TipBox from "../TipBox/TipBox";
import AccountPanel from "../AccountPanel/AccountPanel";
import NavMenu from "../NavMenu/NavMenu";

export default class MblNav extends React.Component {

  state={
    updateAccount:true,
  }

  setUpdateAccount = () =>{
    this.setState({
      updateAccount: !this.state.updateAccount,
    })
  }
  
    render() {
        const open = (!this.props.open && 'invisible') || '';
        return (
            <aside id="mbl-nav" className={open}>
                {/* <Logo id={-mblnav}></Logo> */}
                <NavMenu swapOpen={this.props.swapOpen}></NavMenu>
                <AccountPanel open={this.props.open} setUpdateAccount={this.setUpdateAccount} updateAccount={this.state.updateAccount}></AccountPanel>
                <TipBox></TipBox>
            </aside>
        )
    }

}
