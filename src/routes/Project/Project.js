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

  onAcceptedClick = (bidderId) =>{
    const accepted = this.state.accepted;
    accepted[bidderId] = bidderId;
    const declined = this.state.declined;
    if (bidderId in this.state.declined){
      delete declined[bidderId];
    }
    this.setState({
      accepted,
      declined,
    })
  }

  onDeclinedClick = (bidderId) =>{
    const declined = this.state.declined
    declined[bidderId] = bidderId;
    const accepted = this.state.accepted;
    if (bidderId in this.state.accepted){
      delete accepted[bidderId];
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
        },this.checkOwner)
      })
  }

  checkOwner(){
    // if the current user is the owner then state owner will be set to true
    if (this.state.project.owner_id === TokenService.getPayload().user_id) {
      this.setState({
        owner: true
      },this.checkIfOpen())
    }
  }

  checkIfOpen(){
    if (this.state.project.open){
      this.getBidders();
    }
    // else return comments display
  }

  getBidders(){
    const project_id = this.state.project.id;
    BidsApiService.getBidders(project_id)
      .then(bidders=>{
        this.setState({
          bidders,
        })
      })
  }

  getDeclinedBiddersBidsData(){
    // get declined bidders
    let declinedBiddersIds = Object.keys(this.state.declined);
    declinedBiddersIds = declinedBiddersIds.map(id=>parseInt(id));
    
    // get bid data from the bidders
    let declinedBiddersBids = this.state.bidders.filter(function(bidders){
      return this.indexOf(bidders.user_id) >= 0;
    },declinedBiddersIds)

    // remove user data that does not pertain to bid
    // and set status to declined
    declinedBiddersBids = declinedBiddersBids.map(bid=>{
      const {image,username,user_description, ...bidData} = bid;
      bidData.status = "declined";
      return bidData;
    })

    return declinedBiddersBids;
  }

  handleSubmit=(e)=>{
    e.preventDefault();

    // get project
    const project_id = this.state.project.id;

    // for each accepted bidder set them as a collaborator
    Object.keys(this.state.accepted).forEach(collaborator_id=>{
      console.log(collaborator_id,project_id);
      CollaborationApiService.postCollaborator(parseInt(collaborator_id),project_id,'collaborator')
        .then(res=>{
          console.log(res);
        })
    })

    //for each declined bidder change the status of their bid to declined
    const declinedBids = this.getDeclinedBiddersBidsData();
    declinedBids.forEach(bid=>{
      BidsApiService.updateBid(bid)
        .then(res=>{
          console.log(res);
        })
    });
    
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
        <div className="mbl-separator">
          <h2>ACTIVE BIDDERS:</h2>
          <hr />
        </div>
        <form onSubmit={this.handleSubmit} style={{listStyle: "none", paddingLeft: "30px", paddingTop: "15px"}}>
          <BidderList 
            onDeclineClick={(e)=>this.onDeclinedClick(e.target.value)} 
            onAcceptClick={(e)=>this.onAcceptedClick(e.target.value)} 
            bidders={this.state.bidders}
          />
          <button type="submit">Submit</button>
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
        <main style={{paddingTop: "30px"}}>
          <div className="mbl-separator">
            <h2>PROJECT SPECS:</h2>
            <hr />
          </div>
          <section className="project-page-grid">
            {this.state.project ? <SingleProject key={this.state.project.id} project={this.state.project}></SingleProject> : ''}
          </section>
          <section id="project-page-bidders">
            {display}
          </section>
        </main>
      </section>
    )
  }
}

export default Project