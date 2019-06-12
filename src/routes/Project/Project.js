import React, { Component } from 'react';
import ProfileApiService from '../../services/profile-api-service';
import SingleProject from '../../Components/SingleProject/SingleProject';
import SideBar from '../../Components/SideBar/SideBar';
import BidderList from '../../Components/BidderList/BidderList';
import ProjectApiService from '../../services/project-api-service';
import BidsApiService from '../../services/bids-api-service';
import CollaborationApiService from '../../services/collaboration-api-service';
import TokenService from '../../services/token-service';

class Project extends Component {

  state = {
    profile: {},
    bidsOpen: true,
    authorized: false,
    owner: false,
    project: false,
    bidders: [],
    accepted: {},
    declined: {},
  }

  onAcceptedClick = (user) => {
    const accepted = this.state.accepted;
    accepted[user] = 1;
    const declined = this.state.declined;
    if (user in this.state.declined) {
      delete declined[user];
    }
    this.setState({
      accepted,
      declined,
    })
  }

  onDeclinedClick = (user) => {
    const declined = this.state.declined
    declined[user] = 1;
    const accepted = this.state.accepted;
    if (user in this.state.accepted) {
      delete accepted[user];
    }
    this.setState({
      accepted,
      declined
    })
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
      }, this.checkIfOpen())
    }
  }

  checkIfOpen() {
    if (this.state.project.open) {
      this.getBidders();
    }
    // else return comments display
  }

  getBidders() {
    const project_id = this.state.project.id;
    BidsApiService.getBidders(project_id)
      .then(bidders => {
        this.setState({
          bidders,
        })
      })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const project_id = this.state.project.id;
    console.log(this.state.accepted)
    Object.keys(this.state.accepted).forEach(collaborator_id => {
      console.log(collaborator_id, project_id);
      CollaborationApiService.postCollaborator(parseInt(collaborator_id), project_id, 'collaborator')
        .then(res => {
          console.log(res);
        })
    })

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
    if (this.state.bidsOpen) {
      display = <>
        <form id="bidder-form" onSubmit={this.handleSubmit} style={{ listStyle: "none" }}>
          <BidderList
            onDeclineClick={(e) => this.onDeclinedClick(e.target.value)}
            onAcceptClick={(e) => this.onAcceptedClick(e.target.value)}
            bidders={this.state.bidders}
          />
          <button className="bidder-btn" type="submit">SUBMIT</button>
        </form>
      </>
    } else {
      display = <>
        <h2>Collaborators:</h2>
        <ul>
          <li key={2}>User 2</li>
          <li key={3}>User 3</li>
        </ul>
        <section>Comments Displayed Here...</section>
        <form>
          <input type="text"></input>
          <buton className='btn'>Submit</buton>
        </form>
      </>
    }
    return <>
      {display}
    </>
  }

  renderCollaborator() {
    // status whether project is still pending, closed and have become a collaborator or not
    // if collaborator, have access to message system
    const projectOpen = true;
    return (projectOpen) ? <></> : <>{'Comments displayed here'}</>
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
    } else if (this.authorized) {
      display = this.renderCollaborator();
    } else {
      display = this.renderNonCollaborator();
    }

    return (
      <section className="main-grid">
        <SideBar />
        <main style={{ paddingTop: "30px" }}>
          <div class="mbl-separator">
            <h2>PROJECT SPECS:</h2>
            <hr />
          </div>
          <section className="project-page-grid">
            {this.state.project ? <SingleProject key={this.state.project.id} project={this.state.project}></SingleProject> : ''}
          </section>
          <section id="project-page-bidders">
          <div class="mbl-separator" style={{paddingRight: "0"}}>
          <h2>PENDING BIDDERS:</h2>
          <hr />
        </div>
            {display}
          </section>
        </main>
      </section>
    )
  }
}

export default Project