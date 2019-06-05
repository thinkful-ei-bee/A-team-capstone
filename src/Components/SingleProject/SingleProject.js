import React from 'react';
import TokenService from '../../services/token-service';
class SingleProject extends React.Component {

    renderBidButton = () => {
        return <>
            <button className="btn">Bid!</button>
        </>
    }

    render() {
        return (
            <article className="main-single-project-square">
                <header>
                    <h3>Project Title:</h3>
                </header>
                <article>
                    <p>Project Description:</p>
                    <p>Languages:</p>
                    <p>Minimum Reqs:</p>
                    <p># Developers Needed:</p>
                    <p>Deadline:</p>
                    <p>Personnel Count:</p>
                </article>
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