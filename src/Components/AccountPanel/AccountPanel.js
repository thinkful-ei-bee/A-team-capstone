import React from 'react';
import ProfileApiService from '../../services/profile-api-service';
import ProjectApiService from '../../services/project-api-service';
import TokenService from '../../services/token-service';
import BidsApiService from '../../services/bids-api-service';

export default class AccountPanel extends React.Component {

  state = {
    profile: {},
    projects:[],
    bids: [],
  }

  // get the profile to update the state when component mounts
  componentDidMount() {
    if(TokenService.hasAuthToken()) {
      ProfileApiService.getProfile()
      .then(profile => {
        this.setState({
          profile,
      }, ()=>{
        ProjectApiService.getProjectsForUser(this.state.profile.id)
          .then(projects=>{
            this.setState({
              projects,
            },()=>{
              BidsApiService.getUsersBids()
                .then(bids=>{
                  this.setState({
                    bids,
                  })
                });
            })
          })
      });
    });
    }
  }

    render() {
      const projects = [];
      const bids = [];
      
      this.state.bids.forEach((bid, i) => bids.push(
        <li key={i}>{bid.project_name}</li>
      ));
      
      this.state.projects.forEach(project=>projects.push(project.project_name))
        return (
          TokenService.hasAuthToken()
            ? <article className="account-panel">
            <h3><i>{this.state.profile.username}</i></h3>
            <h4>Projects:</h4>
            {projects.length ? projects : <i><p>None yet....</p></i>}
            <h4>Bids:</h4>
                <ul>
                  {bids}
                </ul>
            </article>
            : null
        )
    }
}