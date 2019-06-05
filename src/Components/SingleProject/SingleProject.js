import React from 'react';
import TokenService from '../../services/token-service';
class SingleProject extends React.Component {

    renderBidButton = () => {
        return <>
            <button className="btn">Bid!</button>
        </>
    }

    /* removed Personnel count for now */

    render() {
        const project = this.props.project;
        return (
            <article className="main-single-project-square">
                <header>
                    <h3>Project Title: {project.project_name}</h3>
                </header>
                {project.open && 
                    <article>
                        <p>Project Description: {project.project_description}</p>
                        <p>Languages: {project.languages}</p>
                        <p>Minimum Reqs: {project.requirements}</p>
                        <p>Developers Needed: {project.openPositions}</p>
                        <p>Deadline: {project.deadline}</p>
                    </article>}
                    {TokenService.hasAuthToken()
                        ? this.renderBidButton()
                        : null}
            </article>
        );
    }
}

export default SingleProject;