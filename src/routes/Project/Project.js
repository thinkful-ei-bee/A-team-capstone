import React, { Component } from 'react';
import ProfileApiService from '../../services/profile-api-service';
import SingleProject from '../../Components/SingleProject/SingleProject';
import SideBar from '../../Components/SideBar/SideBar';
import BidderList from '../../Components/BidderList/BidderList';
import ProjectApiService from '../../services/project-api-service';
import ProjectComments from '../../Components/ProjectComments/ProjectComments';
import BidsApiService from '../../services/bids-api-service';
import CollaborationApiService from '../../services/collaboration-api-service';
import TokenService from '../../services/token-service';
import ProjectsCommentsForm from '../../Components/ProjectsCommentsForm/ProjectsCommentsForm';
import CommentsApiService from '../../services/comments-api-service';
import Footer from '../../Components/Footer/Footer';

class Project extends Component {

  state = {
    profile: {},
    authorized: false,
    owner: false,
    project: false,
    bidders: [],
    accepted: {},
    declined: {},
    collaborators: [],
    closeBidding: false,
    updateComments: false,
    comments:[],
  }

  setProject() {
    // fetch call to get project
    const projectId = this.props.match.params.id;
    ProjectApiService.getProject(projectId)
      .then(project => {
        this.setState({
          project: { ...project[0], open: true }
        }, this.checkOwner)
      })
  }

  checkOwner() {
    // if the current user is the owner then state owner will be set to true
    if (this.state.project.owner_id === TokenService.getPayload().user_id) {
      this.setState({
        owner: true
      }, this.checkIfOpen)
      this.getComments();
    } else {
      this.setState({
        owner: false
      }, this.checkIfOpen)
    }
    // else if project is open and user is a bidder, display bid is pending message
    // else if project is closed and user is a collaborator display comments
    // else if project is closed and user is not a collaborator display message saying user was declined
    // else can assume user is not authorized, therefore display unauthorized
  }

  checkClosedBox = () => {
    this.setState({
      closeBidding: !this.state.closeBidding
    });
  }

  checkIfOpen() {
    // check if project is open for bids
    if (this.state.project.openForBids) {
      this.getBidders();
    }
    // if owner get collaborators
    if (this.state.owner) {
      this.getCollaborators();
    } else {
      this.checkAuthorized();
    }

  }

  getBidders() {
    const project_id = this.state.project.id;
    BidsApiService.getBidders(project_id)
      .then(bidders => {
        const openBidders = bidders.filter(bidder => (bidder.status !== 'accepted' && bidder.status !== 'declined'));
        this.setState({
          bidders: openBidders
        })
      }, this.checkAuthorized)
  }

  getCollaborators() {
    // only for owner
    const project_id = this.state.project.id;
    CollaborationApiService.getCollaborators(project_id)
      .then(collaborators => {
        this.setState({
          collaborators,
        })
      })
  }

  checkAuthorized() {
    let userId = 0;
    if (TokenService.getAuthToken()) {
      userId = TokenService.getPayload().user_id;
    }

    // check if user is in bidders
    if (this.state.bidders && (this.state.bidders.find(bidder => bidder.user_id === userId))) {
      this.setState({
        authorized: true,
      })
      this.getComments();
    }
    // check if user is a collaborator
    else {
      CollaborationApiService.getCohorts()
        .then(cohorts => {
          if (cohorts &&
            cohorts.find(cohort => cohort.project_id === this.state.project.id)) {
            this.setState({
              authorized: true,
            })
            this.getComments();
          } else {
            this.setState({
              authorized: false,
            })
          }
        })
    }
  }

  getComments = ()=>{
    CommentsApiService.getComments(this.state.project.id)
      .then(comments => {

        comments = comments.sort((comment1, comment2) => {
          if (comment1.date_created > comment2.date_created) { 
            return -1; 
          } else {
            return 1;
          }
        });

        this.setState({
          comments
        })
      })
  }

  onAcceptedClick = (bidderId) => {
    const accepted = this.state.accepted;
    accepted[bidderId] = bidderId;
    const declined = this.state.declined;
    if (bidderId in this.state.declined) {
      delete declined[bidderId];
    }
    this.setState({
      accepted,
      declined,
    })
  }

  onDeclinedClick = (bidderId) => {
    const declined = this.state.declined
    declined[bidderId] = bidderId;
    const accepted = this.state.accepted;
    if (bidderId in this.state.accepted) {
      delete accepted[bidderId];
    }
    this.setState({
      accepted,
      declined
    })
  }

  getDeclinedBiddersBidsData() {
    // get declined bidders
    let declinedBiddersIds = Object.keys(this.state.declined);
    declinedBiddersIds = declinedBiddersIds.map(id => parseInt(id));

    // get bid data from the bidders
    let declinedBiddersBids = this.state.bidders.filter(function (bidders) {
      return this.indexOf(bidders.user_id) >= 0;
    }, declinedBiddersIds)

    // remove user data that does not pertain to bid
    // and set status to declined
    declinedBiddersBids = declinedBiddersBids.map(bid => {
      const { image, username, user_description, ...bidData } = bid;
      bidData.status = "declined";
      return bidData;
    })

    return declinedBiddersBids;
  }

  setUpdateComments = () => {
    this.setState({
      updateComments: !this.state.updateComments
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    // get project
    const project_id = this.state.project.id;

    // for each accepted bidder set them as a collaborator
    Object.keys(this.state.accepted).forEach(collaborator_id => {
      CollaborationApiService.postCollaborator(parseInt(collaborator_id), project_id, 'collaborator')
        .then(res => {

        })
    })

    //for each declined bidder change the status of their bid to declined
    const declinedBids = this.getDeclinedBiddersBidsData();
    declinedBids.forEach(bid => {
      BidsApiService.updateBid(bid)
        .then(res => {

        })
    });

    // fetch call to update project to make sure openForBids is false
    const project = this.state.project;
    project.openForBids = !this.state.closeBidding;

    // remove open as that key is only used on the client side
    const { open, ...updatedProject } = project
    ProjectApiService.updateProject(updatedProject)
      .then((res) => {
        this.setProject();
      })
  }

  handleCommentSubmit = (ev, content) => {

    ev.preventDefault();

    // updates state.error
    this.setState({ error: null });

    //deconstruct form values into variables
    const { comment } = ev.target;

    const userComment = { content }
    CommentsApiService.postComment(this.state.project.id, userComment)
      .then(res => {
        this.setUpdateComments();
      })
      .catch(res => {
        this.setState({ error: res.error });
      })
    comment.value = '';
  }

  componentDidMount() {
    // get Profile Info
    if (TokenService.hasAuthToken()) {

      ProfileApiService.getProfile()
        .then(profile => {
          this.setState({
            profile,
          });
        });
    }

    // set project
    this.setProject();
    // fetch call to check collaborators/bidders on project
    // fetch call to get bidders for owner to see
    // if user matches one of the collaborators setstate authorized to true
    // if user matches owner setstate owner to true

  }

  componentDidUpdate() {
    if (this.state.project && parseInt(this.props.match.params.id) !== this.state.project.id) {
      this.setProject();
    }
  }

  renderOwner() {
    // list of bidders or collaborators
    // and message system
    let display = [];
    if (this.state.project.openForBids && this.state.bidders.length > 0) {
      display.push(
        <React.Fragment key="bidderList">
          <div className="mbl-separator" style={{ padding: "0" }}>
            <h2>PENDING BIDDERS:</h2>
            <hr />
          </div>
          <form id="bidder-form" onSubmit={this.handleSubmit} style={{ listStyle: "none" }}>
            <BidderList
              onDeclineClick={(e) => this.onDeclinedClick(e.target.value)}
              onAcceptClick={(e) => this.onAcceptedClick(e.target.value)}
              bidders={this.state.bidders}
            />
            <input id="closebids" name="closebids" type="checkbox" checked={this.state.closeBidding} onChange={this.checkClosedBox} />
            <label id="closebidslabel" htmlFor="closebids">CLOSE BIDDING</label>
            <button className="btn" type="submit">CONFIRM</button>
          </form>
        </React.Fragment>);
    }

    const collaboratorUsers = []
    this.state.collaborators.forEach(
      (collaborator, i) =>
        collaboratorUsers.push(<li key={i}><h3>{collaborator.username}</h3></li>)
    );

    if (collaboratorUsers.length > 0) {
      display.push(<React.Fragment key="collaborationList">
        <section id="collab_section">
          <div className="mbl-separator" style={{ padding: "0", marginRight: "10px", marginBottom: "35px" }}>
            <h2>COLLABORATORS:</h2>
            <hr />
          </div>
          <ul>
            {collaboratorUsers}
          </ul>
        </section>
        <ProjectsCommentsForm project_id={this.state.project.id} handleCommentSubmit={this.handleCommentSubmit} />
        <hr />
        <ProjectComments getComments={this.getComments} comments={this.state.comments} project_id={this.state.project.id} updateComments={this.state.updateComments} setUpdateComments={this.setUpdateComments} />
      </React.Fragment>)
    }

    return <>
      {display}
    </>
  }

  renderCollaborator() {
    // status whether project is still pending, closed and have become a collaborator or not
    // if collaborator, have access to message system
    return <>
      <ProjectsCommentsForm project_id={this.state.project.id} handleCommentSubmit={this.handleCommentSubmit} />
      <hr />
      <ProjectComments getComments={this.getComments} comments={this.state.comments} project_id={this.state.project.id} updateComments={this.state.updateComments} setUpdateComments={this.setUpdateComments} />
    </>
  }

  renderNonCollaborator() {
    // standard message that they do not have access
    return <>
      <h2>You do not have access to this project</h2>
    </>
  }

  render() {
    let display = [];

    if (this.state.owner) {
      display = this.renderOwner();
    } else if (this.state.authorized) {
      display = this.renderCollaborator();
    } else {
      display = this.renderNonCollaborator();
    }

    return (
      <React.Fragment>
        <section className="main-grid">
          <SideBar />
          <section style={{ paddingTop: "15px" }}>
            <div className="mbl-separator">
              <h2>PROJECT SPECS:</h2>
              <hr />
            </div>
            <section className="project-page-grid">
              {this.state.project ? <SingleProject key={this.state.project.id} project={this.state.project} updateBids={() => {}}></SingleProject> : ''}
            </section>
            <section id="project-page-bidders">
              {display}
            </section>
          </section>
        </section>
        <Footer></Footer>
      </React.Fragment>
    )
  }
}

export default Project