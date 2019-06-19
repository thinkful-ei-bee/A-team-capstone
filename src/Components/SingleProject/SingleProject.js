import React from 'react';
import moment from 'moment';
import TokenService from '../../services/token-service';
import BidsApiService from '../../services/bids-api-service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMitten } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
class SingleProject extends React.Component {

    state = {
        userBidOnThis: false,
        bidStatus: null
    }

    onClickBid = () => {

        BidsApiService.postBid({
            bid: 'null',
            project_id: this.props.project.id
        })
            .then(() => {
                this.setState({
                    userBidOnThis: true,
                    bidStatus: null
                },
                    this.props.updateBids());
            })
    }

    renderLink = (project) => {
        const link = `/projects/${project.id}`;
        return <Link to={link} className="project-page-link">Project Page</Link>;
    }

    renderBidButton = () => {
        const mitten = <FontAwesomeIcon icon={faMitten} className=" thumbsUp" />
        return <>
            <button onClick={this.onClickBid} className="bid-btn"><small style={{
                color: "white",
                fontSize: "10px",
                left: "25px",
               
            }}>{mitten}BID</small><p className="invisible"></p></button>
            
        </>
    }


    componentDidMount() {
        const project = this.props.project;
        let userBid = false;
        let bidStatus = null;
        if (TokenService.hasAuthToken()) {
            BidsApiService.getUsersBids()
                .then(bids => {
                    bids.forEach(bid => {
                        if (bid.project_id === project.id) {
                            userBid = true;
                            bidStatus = bid.status;
                        }
                    })
                    this.setState({
                        userBidOnThis: userBid,
                        bidStatus: bidStatus
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

        const renderButton = (userId && (project.owner_id !== userId) && !this.state.userBidOnThis && project.openForBids === true)

        return (
            <article className={openClass} onClick={this.props.onClick}>
                <header>
                    <h2>{title}</h2>
                </header>
                {(project.owner_id === userId || (this.state.userBidOnThis && this.state.bidStatus === 'accepted'))
                    ? <small style={{
                        background: "#980000", color: "white", padding: "4px 7px 3px 5px", borderRadius: "3px", fontSize: "12px", position: "absolute",
                        bottom: "16px", right: "15px", border: "1px solid white"
                    }
                    }
                    ><i>COLLABORATOR</i></small>
                    : null}
                {(this.state.userBidOnThis && this.state.bidStatus === null )
                    ? <small style={{
                        background: "rgb(19, 90, 15)", color: "white", padding: "4px 7px 3px 5px", borderRadius: "3px", fontSize: "12px", position: "absolute",
                        bottom: "16px", right: "15px", border: "1px solid white"
                    }
                    }
                    ><i>BID PENDING</i></small>
                    : null}
                {(this.state.userBidOnThis && this.state.bidStatus === 'declined' )
                    ? <small style={{
                        background: "black", color: "red", padding: "4px 7px 3px 5px", borderRadius: "3px", fontSize: "12px", position: "absolute",
                        bottom: "16px", right: "15px", border: "1px solid red"
                    }
                    }
                    ><i>BID DECLINED</i></small>
                    : null}
                {(!this.state.userBidOnThis || this.state.bidStatus === null) && project.openForBids === false && project.owner_id !== userId
                    ? <small style={{
                        background: "black", color: "green", padding: "4px 7px 3px 5px", borderRadius: "3px", fontSize: "12px", position: "absolute",
                        bottom: "16px", right: "15px", border: "1px solid green"
                    }
                    }
                    ><i>BIDDING CLOSED</i></small>
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
                        {this.props.renderLink ? this.renderLink(project) : null}
                    </article>}
                {renderButton
                    ? this.renderBidButton()
                    : null}
            </article>
        );
    }
}

export default SingleProject;
