import React, {Component} from 'react';
import SingleProject from '../../Components/SingleProject/SingleProject';
import SideBar from '../../Components/SideBar/SideBar';
import ProjectApiService from '../../services/project-api-service';

class Project extends Component{

  state={
    bidsOpen:true,
    authorized:false,
    owner: false,
    project: false,
    bidders: []
  }

  componentDidMount(){
    ProjectApiService.getAllProjects()
      .then(projects=>{
        this.setState({
          project: {...projects[0],open:true}
        })
      })
    // fetch call to get project
    // fetch call to check collaborators/bidders on project
    // fetch call to get bidders for owner to see
    // if user matches one of the collaborators setstate authorized to true
    // if user matches owner setstate owner to true

  }

  renderOwner(){
    // list of bidders or collaborators
    // and message system
    return <>
    </>
  }

  renderCollaborator(){
    // status whether project is still pending, closed and have become a collaborator or not
    // if collaborator, have access to message system

  }

  renderNonCollaborator(){
    // standard message that they do not have access
    return <>
      <h2>You do not have access to this project</h2>
    </>
  }

 render(){
  let display = [];

  if (this.state.ownwer){
    display = this.renderOwner();
  }else if (this.authorized){
    display = this.renderCollaborator();
  }else{
    display = this.renderNonCollaborator();
  }

   return(
     <section className="main-grid">
      <SideBar />
      <main>
        <section className="main-project-grid">
          {this.state.project ? <SingleProject key={this.state.project.id} project={this.state.project}></SingleProject> : ''}
          
        </section>
        <section>
          {display}
        </section>
      </main>
     </section>
   )
 } 
}

export default Project