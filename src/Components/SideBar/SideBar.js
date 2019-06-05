import React from 'react';

export default class SideBar extends React.Component{

    render(){
        return(
            <aside className="sidebar">
                    <article className="account-panel">
                        USERNAME
                        <h4>Projects:</h4>
                        React Project....
                        <h4>Bids:</h4>
                        3 Bids Pending....
                    </article>
                    <article className="tip">
                        <h4>How To Use It!</h4>
                        <hr className="sidebar-separator" />
                        <small>1. Login</small>
                        <small>2. Click the Bid Button</small>
                        <small>3. Wait for approval</small>
                    </article>
                </aside>
        )
    }
}