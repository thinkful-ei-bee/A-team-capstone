import React from 'react';
import ProfileApiService from '../../services/profile-api-service';
import ProjectApiService from '../../services/project-api-service';
import TokenService from '../../services/token-service';
import BidsApiService from '../../services/bids-api-service';
import { Link } from "react-router-dom";

export default class AccountPanel extends React.Component {

  state = {
    profile: {},
    projects:[],
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
    });
    }
  }

  componentDidUpdate(){
    if(this.props.updateBids){
      this.getUsersBids();
    }
  }

  render() {
    const projects = [];
    const bids = [];
    
    this.state.bids.forEach((bid, i) => bids.push(
      <li key={i}><Link to={`/projects/${bid.project_id}`}>{bid.project_name}</Link></li>
    ));
    
    this.state.projects.forEach(project=>projects.push(<Link to={`/projects/${project.id}`}>{project.project_name}</Link>))
      return (
        TokenService.hasAuthToken()
          ? <article className="account-panel">
          <h2><i>{this.state.profile.username}</i></h2>
          <h4>PROJECTS:</h4>
          {projects.length ? projects : <i><p>None yet....</p></i>}
          <h4>COHORTS:</h4>
          <i><p>0</p></i>
          <h4 className="bids-text">BIDS:</h4>
              <ul>
                {bids}
              </ul>
          </article>
          : null
      )
  }
}