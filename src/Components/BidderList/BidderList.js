import React from 'react';
import Bidder from '../Bidder/Bidder';

class BidderList extends React.Component {

    render() {
      const bidders = [];
      this.props.bidders.forEach(bidder=>{
        bidders.push(
        <Bidder key={bidder.id}
          bidder={bidder}
          onDeclineClick={this.props.onDeclineClick} 
          onAcceptClick={this.props.onAcceptClick} 
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
