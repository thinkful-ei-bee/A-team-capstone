import React from 'react';
import ProfileApiService from '../../services/profile-api-service';
import ProjectApiService from '../../services/project-api-service';
import TokenService from '../../services/token-service';
import BidsApiService from '../../services/bids-api-service';
import { Link } from "react-router-dom";
import CollaborationApiService from '../../services/collaboration-api-service';

export default class AccountPanel extends React.Component {

  state = {
    profile: {},
    projects:[],
    cohorts:[],
    bids: [],
    updating: false,
  }
  
  getUsersBids = () =>{
    BidsApiService.getUsersBids()
      .then(bids=>{
        this.setState({
          bids,
        })
      });
  } 

  getUsersProjects = () =>{
    ProjectApiService.getProjectsForUser(this.state.profile.id)
      .then(projects=>{
        this.setState({
          projects,
        })
      });
  }

  getUsersCohorts = () => {
    CollaborationApiService.getCohorts()
      .then(cohorts => {
        this.setState( { cohorts })
      });
  }

  // get the profile to update the state when component mounts
  componentDidMount() {
    if(TokenService.hasAuthToken()) {
      ProfileApiService.getProfile()
      .then(profile => {
        this.setState({
          profile,
      });
      this.getUsersProjects();
      this.getUsersBids();
      this.getUsersCohorts();
    });
    }
  }

  componentDidUpdate(){
    if(this.props.updateBids){
      this.getUsersBids();
      this.getUsersCohorts();
    }
  }

  render() {
    const projects = [];
    const cohorts = [];
    let bids = [];
    const cohortProjectIds =[];
    this.state.cohorts.forEach((cohort, i) => {
      cohorts.push(<li key={i}><Link key={cohort.project_id} to={`/projects/${cohort.project_id}`}>{cohort.project_name}</Link></li>)
      cohortProjectIds.push(cohort.project_id)
    });
    // keep track of project ids in cohorts and filter any bid that has that same project_id
    const filteredBids = this.state.bids.filter(function(bid){return cohortProjectIds.indexOf(bid.project_id)<0},cohortProjectIds)
    
    filteredBids.forEach((bid, i) => bids.push(
      <li key={i}><Link to={`/projects/${bid.project_id}`}>{bid.project_name}</Link></li>
    ));

    this.state.projects.forEach((project, i) => projects.push(<li key={i}><Link key={project.id} to={`/projects/${project.id}`}>{project.project_name}</Link></li>));

      
    return (
        TokenService.hasAuthToken()
          ? <article className="account-panel">
          <h2><i>{this.state.profile.username}</i></h2>
          <h4>PROJECTS:</h4>
          {projects.length ? <ul>{projects}</ul> : <i><p>None yet....</p></i>}
          <h4>COHORTS:</h4>
          {cohorts.length ? <ul>{cohorts}</ul> : <i><p>None yet....</p></i>}
          <h4 className="bids-text">BIDS:</h4>
              <ul>
                {bids}
              </ul>
          </article>
          : null
      )
  }
}