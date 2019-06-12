import React from 'react';

class Bidder extends React.Component {


    render() {
        return (
          <div key={this.props.bidder.user_id}>
            <h3><i>{this.props.bidder.username}</i></h3>
            <label htmlFor={`${this.props.bidder.username}-accept`}>Accept</label> 
            <input onClick={this.props.onAcceptClick} id={`${this.props.bidder.user_id}-accept`} type="radio" name={this.props.bidder.username} className='btn green-text' value={this.props.bidder.user_id}/>
            <label htmlFor={`${this.props.bidder.username}-decline`}>Decline</label>
            <input onClick={this.props.onDeclineClick} id={`${this.props.bidder.user_id}-decline`} type="radio" name={this.props.bidder.username}className='btn red-text' value={this.props.bidder.user_id}/>
          </div>
        );
    }
}

export default Bidder;
