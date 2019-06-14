import React, { Component } from 'react';
import ProfileApiService from '../../services/profile-api-service';
import ProjectApiService from '../../services/project-api-service';
import "./Profile.css";


export default class Profile extends Component {
  
  state = {
    profile: {},
    projects:[],
    bids: {},
  }

  // get the profile to update the state when component mounts
  componentDidMount(){
    ProfileApiService.getProfile()
      .then(profile=>{
        this.setState({
          profile,
      }, 
      ()=>{
        ProjectApiService.getProjectsForUser(this.state.profile.id)
          .then(projects=>{
            this.setState({
              projects,
            })
          })
      })
    })
  }

    // render Profile component
    render() {
      const projects = [];
      this.state.projects.forEach(project=>projects.push(project.project_name))
      return(
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