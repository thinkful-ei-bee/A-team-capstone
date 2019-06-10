import React from 'react';
import TokenService from '../../services/token-service';

class Bidder extends React.Component {

  handleAcceptOnClick = () => {
    // function to set user to ready to be changed to collaborator
  }

  handleDeclineOnClick = () => {
    // function to set user to ready to be delined as collaborator
  }

    render() {

        return (
          <li>
            <h3><i>{this.props.username}</i></h3>
            <button onClick ={this.handleAcceptOnClick} className='btn green-text'>Accept</button>
            <button onClick ={this.handleDeclineOnClick} className='btn red-text'>Decline</button>
          </li>
        );
    }
}

export default Bidder;
