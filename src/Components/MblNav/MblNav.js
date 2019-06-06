import React from 'react';

export default class MblNav extends React.Component {
    render() {
        const open = (!this.props.open && 'invisible') || '';
        return (
            <aside id="mbl-nav" className={open}></aside>
        )
    }
   
}
