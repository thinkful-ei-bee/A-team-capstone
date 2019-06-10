import React from 'react';
import Bidder from '../Bidder/Bidder';
import TokenService from '../../services/token-service';

class BidderList extends React.Component {
  // will need props of list of bidders

  handleAcceptOnClick = () => {
    // function to set user to ready to be changed to collaborator
  }

  handleDeclineOnClick = () => {
    // function to set user to ready to be delined as collaborator
  }

    render() {
      const bidders = [];
      this.props.bidders.forEach(bidder=>{
        bidders.push(<Bidder username={bidder.id}/>)
      })
        return (
          <ul>
            {bidders}
          </ul>
        );
    }
}

export default BidderList;
