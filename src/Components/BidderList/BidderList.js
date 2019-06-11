import React from 'react';
import Bidder from '../Bidder/Bidder';

class BidderList extends React.Component {

    render() {
      const bidders = [];
      this.props.bidders.forEach(bidder=>{
        console.log(bidder);
        bidders.push(
        <Bidder 
          userId={bidder.user_id}
          onDeclineClick={this.props.onDeclineClick} 
          onAcceptClick={this.props.onAcceptClick} 
          username={bidder.username}
        />)
      })
        return (
          <>
            {bidders}
          </>
        );
    }
}

export default BidderList;
