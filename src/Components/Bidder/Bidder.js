import React from 'react';

class Bidder extends React.Component {


  render() {

    return (
      <React.Fragment>
        <div id="bidder-input" key={this.props.userId}>
          <h3><i>{this.props.username}</i></h3>
          <div className="bidder-input-grid">
            <div>
              <label htmlFor={`${this.props.username}-accept`}><small>ACCEPT</small></label>
              <input onClick={this.props.onAcceptClick} id={`${this.props.userId}-accept`} type="radio" name={this.props.username} className='btn green-text' value={this.props.userId} />
            </div>

            <div>
              <label htmlFor={`${this.props.username}-decline`}><small>DECLINE</small></label>
              <input onClick={this.props.onDeclineClick} id={`${this.props.userId}-decline`} type="radio" name={this.props.username} className='btn red-text' value={this.props.userId} />
            </div>
          </div>
        </div>
      </React.Fragment>

    );
  }
}

export default Bidder;
