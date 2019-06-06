import React from 'react';
import ProfileApiService from '../../services/profile-api-service';
import ProjectApiService from '../../services/project-api-service';
import BidsApiService from '../../services/bids-api-service';

export default class AccountPanel extends React.Component {

  state = {
    profile: {},
    projects:[],
    bids: [],
  }

  // get the profile to update the state when component mounts
  componentDidMount(){
    ProfileApiService.getProfile()
      .then(profile=>{
        console.log(profile)
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
                })
            })
          })
      })
    })
  }

    render() {
      const projects = [];
      this.state.projects.forEach(project=>projects.push(project.project_name))
        return (
            <article className="account-panel">
                {this.state.profile.username}
                <h4>Projects:</h4>
                {projects}
                <h4>Bids:</h4>
                3 Bids Pending....
            </article>
        )
    }
}