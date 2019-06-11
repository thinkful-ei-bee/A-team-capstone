import React from 'react';

class Bidder extends React.Component {


    render() {

        return (
          <div key={this.props.userId}>
            <h3><i>{this.props.username}</i></h3>
            <label htmlFor={`${this.props.username}-accept`}>Accept</label> 
            <input onClick={this.props.onAcceptClick} id={`${this.props.userId}-accept`} type="radio" name={this.props.username} className='btn green-text' value={this.props.userId}/>
            <label htmlFor={`${this.props.username}-decline`}>Decline</label>
            <input onClick={this.props.onDeclineClick} id={`${this.props.userId}-decline`} type="radio" name={this.props.username}className='btn red-text' value={this.props.userId}/>
          </div>
        );
    }
}

export default Bidder;
