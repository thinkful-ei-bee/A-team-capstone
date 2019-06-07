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
                    {renderButton
                        ? this.renderBidButton()
                        : null}
            </article>
        );
    }
}

export default SingleProject;