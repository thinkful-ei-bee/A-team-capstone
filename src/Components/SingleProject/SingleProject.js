import React from 'react';
import moment from 'moment';
import TokenService from '../../services/token-service';
import BidsApiService from '../../services/bids-api-service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMitten } from '@fortawesome/free-solid-svg-icons'

class SingleProject extends React.Component {

    state = {
        userBidOnThis: false
    }

    onClickBid = () => {

        BidsApiService.postBid({
            bid: 'null',
            project_id: this.props.project.id
        })
            .then(() => {
                this.setState({
                    userBidOnThis: true
                },
                    this.props.updateBids());
            })
    }

    renderBidButton = () => {
        const mitten = <FontAwesomeIcon icon={faMitten} className=" thumbsUp fa-2x" />
        return <>
            <button onClick={this.onClickBid} className="bid-btn"><small style={{
                color: "red", color: "red",
                
                fontSize: "10px",
                left: "25px",
                letterSpacing: "8px",
                fontWeight: "600"
            }}>{mitten}</small></button>
            
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
            if (title.length > 40) {
                title = title.slice(0, 40) + '...';
            } else {
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
                {(project.owner_id === userId)
                    ? <small style={{
                        background: "red", color: "white", padding: "4px 7px 3px 5px", borderRadius: "3px", fontSize: "12px", position: "absolute",
                        bottom: "16px", right: "15px", border: "1px solid white"
                    }
                    }

                    ><i>COLLABORATOR</i></small>
                    : null}
                {(this.state.userBidOnThis)
                    ? <small style={{
                        background: "limegreen", color: "white", padding: "4px 7px 3px 5px", borderRadius: "3px", fontSize: "12px", position: "absolute",
                        bottom: "16px", right: "15px", border: "1px solid white"
                    }
                    }

                    ><i>BID PENDING</i></small>
                    : null}
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
                        <h3>Deadline:</h3> <p>{moment(project.deadline).format('MM-DD-YYYY')}</p>
                    </article>}
                {renderButton
                    ? this.renderBidButton()
                    : null}
            </article>
        );
    }
}

export default SingleProject;
