import React from 'react';

export default class HamburgerButton extends React.Component {
    render() {
        return (
            <ul className="bars float-right" onClick={this.props.swapOpen}>
                <li className="bar"></li>
                <li className="bar"></li>
                <li className="bar"></li>
              </ul>
        )
    }
}

