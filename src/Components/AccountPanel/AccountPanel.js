import React from 'react';
import ProfileApiService from '../../services/profile-api-service';
import ProjectApiService from '../../services/project-api-service';
import TokenService from '../../services/token-service';

export default class AccountPanel extends React.Component {

  state = {
    profile: {},
    projects: [],
    bids: {},
  }

  // get the profile to update the state when component mounts
  componentDidMount() {
    ProfileApiService.getProfile()
      .then(profile => {
        console.log(profile)
        this.setState({
          profile,
        },
          () => {
            ProjectApiService.getProjectsForUser(this.state.profile.id)
              .then(projects => {
                this.setState({
                  projects,
                })
              })
          })
      })
  }

  render() {
    const projects = [];
    this.state.projects.forEach(project => projects.push(project.project_name))
    return (
      TokenService.hasAuthToken()
        ? <article className="account-panel">
          <h3><i>{this.state.profile.username}</i></h3>
          <h4>Projects:</h4>
          {projects.length ? projects : <i><p>None yet....</p></i>}
          <h4>Bids:</h4>
          <i><p>3 Pending....</p></i>
        </article>
        : null
    )
  }
}