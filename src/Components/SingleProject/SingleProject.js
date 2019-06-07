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
            <article className={openClass} >
              <div onClick={this.props.onClick}>
                <header>
                    <h2>{title}</h2>
                </header>
                {project.open && 
                    <article>
                        <p>Project Description: {project.project_description}</p>
                        <p>Languages: {project.languages}</p>
                        <p>Minimum Reqs: {project.requirements}</p>
                        <p>Developers Needed: {project.openPositions}</p>
                        <p>Deadline: {project.deadline}</p>
                    </article>}
              </div>
                    {TokenService.hasAuthToken()
                        ? this.renderBidButton()
                        : null}
            </article>
        );
    }
}

export default SingleProject;