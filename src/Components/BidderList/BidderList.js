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
    let bidderGridClass;
    if(bidders.length == 2)
    console.log(bidders.length + 'aye')
  
      if (bidders.length % 3 === 1 || bidders.length === 1) {
        bidderGridClass = "bid-grid-full"
        console.log(bidderGridClass)
      } else if (bidders.length % 3 === 2 || bidders.length === 2) {
        bidderGridClass = "bid-grid-halves"
        console.log(bidderGridClass)
      } else {
        bidderGridClass = "bid-grid-thirds"
        console.log(bidderGridClass)
      }
    return (
      <>
        <article>
          <div className={bidderGridClass}>
            {bidders}
          </div>
        </article>
      </>
    );
  }
}

export default BidderList;
