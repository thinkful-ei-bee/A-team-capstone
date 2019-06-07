import React, {Component} from 'react';
import ProfileApiService from '../../services/profile-api-service';
import SingleProject from '../../Components/SingleProject/SingleProject';
import SideBar from '../../Components/SideBar/SideBar';
import ProjectApiService from '../../services/project-api-service';
import TokenService from '../../services/token-service';

class Project extends Component{

  state={
    profile:{},
    bidsOpen:true,
    authorized:false,
    owner: false,
    project: false,
    bidders: []
  }

  setProject(){
    // fetch call to get project
    const projectId = this.props.match.params.id;
    ProjectApiService.getProject(projectId)
      .then(project=>{
        this.setState({
          project: {...project[0],open:true}
        })
      })
  }

  componentDidMount(){
    // get Profile Info
    if(TokenService.hasAuthToken()) {
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

  componentDidUpdate(){
    if (!this.state.owner && this.state.project.owner_id === this.state.profile.id){
      this.setState({
        owner:true
      })
    }
  
    if (this.state.project && parseInt(this.props.match.params.id) !== this.state.project.id){
      this.setProject();
      
    }
  }

  renderOwner(){
    // list of bidders or collaborators
    // and message system
    let display = [];
    if (this.state.bidsOpen){
      display =<>
        <h2>Bidders:</h2>
        <ul>
          <li>
          User 1
          <button className='btn'>Accept</button>
          <button className='btn'>Decline</button>
          </li>
          <li>User 2
            <button className='btn'>Accept</button>
            <button className='btn'>Decline</button></li>
          <li>User 3
            <button className='btn'>Accept</button>
            <button className='btn'>Decline</button></li>
        </ul>
      </>
    }else{
      display = <>
        <h2>Collaborators:</h2>
        <ul>
          <li>User 2</li>
          <li>User 3</li>
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

  if (this.state.owner){
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