import React from 'react';

class Bidder extends React.Component {

  render() {

    return (
      <React.Fragment>
        <div className="bidder-input" key={this.props.bidder.user_id}>
          <h3><i>{this.props.bidder.username}</i></h3>
          <div className="bidder-input-grid">
            <div>
              <label htmlFor={`${this.props.bidder.username}-accept`}><small>ACCEPT</small></label>
              <input onClick={this.props.onAcceptClick} id={`${this.props.bidder.user_id}-accept`} type="radio" name={this.props.bidder.username} className='btn green-text' value={this.props.bidder.user_id} />
            </div>

            <div>
              <label htmlFor={`${this.props.bidder.username}-decline`}><small>DECLINE</small></label>
              <input onClick={this.props.onDeclineClick} id={`${this.props.bidder.user_id}-decline`} type="radio" name={this.props.bidder.username} className='btn red-text' value={this.props.bidder.user_id} />
            </div>
          </div>
        </div>
      </React.Fragment>

    );
  }
}

export default Bidder;
