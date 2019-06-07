import React from 'react';
import TokenService from '../../services/token-service';
import BidsApiService from '../../services/bids-api-service';
class SingleProject extends React.Component {

    state = {
        userBidOnThis: false
    }

    renderBidButton = () => {
        return <>
            <button className="bid-btn">Bid!</button>
        </>
    }

    componentDidMount() {
        const project = this.props.project;
        let userBid = false;
        if (TokenService.hasAuthToken()) {
            BidsApiService.getUsersBids()
                .then(bids => {
                    bids.forEach(bid => {
                        if (bid.project_id === project.id) {
                            userBid = true;
                        }
                    })
                    this.setState({
                        userBidOnThis: userBid
                    })
                })
        }
    }

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

        const hasToken = TokenService.hasAuthToken();
        let userId = null;

        if (hasToken) {
            userId = TokenService.getPayload().user_id;
        }

        const renderButton = (userId && (project.owner_id !== userId) && !this.state.userBidOnThis)
        
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
                    {renderButton
                        ? this.renderBidButton()
                        : null}
            </article>
        );
    }
}

export default SingleProject;
