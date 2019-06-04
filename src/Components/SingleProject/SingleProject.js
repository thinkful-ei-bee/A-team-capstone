import React from 'react';
import TokenService from '../../services/token-service';
class SingleProject extends React.Component{

    renderBidButton = () => {
        return <>
        <button className="btn">Bid!</button>
        </>
    }

    render(){
        return(
            <article className="main-single-project-square">
                <h3>Project Title:</h3>
                {/* <p>Project Description:</p>
                <p>Languages:</p>
                <p>Minimum Reqs:</p>
                <p>Personnel Count:</p>
                <p>Deadline:</p>
                <p>Personnel Count:</p> */}
                {
                    TokenService.hasAuthToken()
                    ? this.renderBidButton()
                    : null
                }
            </article>
        )
    }
}

export default SingleProject;