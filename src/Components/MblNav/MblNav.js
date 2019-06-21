import React from 'react';
import TipBox from "../TipBox/TipBox";
import AccountPanel from "../AccountPanel/AccountPanel";
import NavMenu from "../NavMenu/NavMenu";
import Logo from "../Logo/Logo";
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
        const open = (!this.props.open && 'ease-close') || 'ease-open';
        return (
            <aside id="mbl-nav" className={open}>
                <Logo></Logo>
                <NavMenu swapOpen={this.props.swapOpen}></NavMenu>
                <AccountPanel open={this.props.open} setUpdateAccount={this.setUpdateAccount} updateAccount={this.state.updateAccount}></AccountPanel>
                <TipBox></TipBox>
            </aside>
        )
    }

}
