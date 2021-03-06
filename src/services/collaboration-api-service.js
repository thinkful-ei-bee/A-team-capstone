import config from '../config';
import TokenService from './token-service';
//POST /api/collaboration which will require a body with collaborator id and project id and will only function if the project belongs to the authenticated user and it matches a bid (and in that case will remove the bid and create the collaboration.)
const CollaborationApiService = {
  getCohorts() {
    return fetch(`${config.API_ENDPOINT}/collaboration`,{
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'Authorization' : `bearer ${TokenService.getAuthToken()}`
        }})
        .then(res=>
          (!res.ok) 
            ? res.json().then(e=>Promise.reject(e))
            : res.json()
        );
  },
  postCollaborator(collaborator_id,project_id,position){
  // requires "project_id", "collaborator_id" and  "position"
    const body = JSON.stringify({
      collaborator_id,
      project_id,
      position
    }); 
    return fetch(`${config.API_ENDPOINT}/collaboration`,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'Authorization' : `bearer ${TokenService.getAuthToken()}`
        },
      body
    })
    .then(res=>
      (!res.ok)
        ? res.json().then(e=>Promise.reject(e))
        : res.json()
    );
  },
  getCollaborators(project_id){
    return fetch(`${config.API_ENDPOINT}/collaboration/${project_id}`,{
      method: 'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
    .then(res=>
      (!res.ok) 
        ? res.json().then(e=>Promise.reject(e))
        : res.json()
    );
  },
  getCollaborations(){
    return fetch(`${config.API_ENDPOINT}/collaboration`,{
      method: 'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
    .then(res=>
      (!res.ok) 
        ? res.json().then(e=>Promise.reject(e))
        : res.json()
    );
  }
}

export default CollaborationApiService;