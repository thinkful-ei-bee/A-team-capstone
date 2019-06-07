import React from 'react';
import TokenService from '../../services/token-service';
class SingleProject extends React.Component {

    renderBidButton = () => {
        return <>
            <button className="bid-btn">Bid!</button>
        </>
    }

    /* removed Personnel count for now */

    render() {
        const project = this.props.project;
        let openClass = "main-single-project-square open";
        let title = project.project_name;

        if (!project.open) {
            openClass = "main-single-project-square closed";
            if(title.length > 40){
                title = title.slice(0, 40) + '...';
            }else{
                title = title.slice(0, 40);
            }
            
        }
        
        return (
            <article className={openClass} onClick={this.props.onClick}>
                <header>
                    <h2>{title}</h2>
                </header>
                {project.open && 
                    <article>
                        <p>{project.project_description}</p>
                        <hr className="single-project-content-separator"></hr>
                        <h3>Languages:</h3> <p>{project.languages}</p>
                        <hr className="single-project-content-separator"></hr>
                        <h3>Minimum Reqs:</h3> <p>{project.requirements}</p>
                        <hr className="single-project-content-separator"></hr>
                        <h3>Developers Needed:</h3> <p>{project.openPositions}</p>
                        <hr className="single-project-content-separator"></hr>
                        <h3>Deadline:</h3> <p>{project.deadline}</p>
                    </article>}
                    {TokenService.hasAuthToken()
                        ? this.renderBidButton()
                        : null}
            </article>
        );
    }
}

export default SingleProject;
