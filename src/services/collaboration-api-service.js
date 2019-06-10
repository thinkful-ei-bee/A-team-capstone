import config from '../config';
import TokenService from './token-service';
//POST /api/collaboration which will require a body with collaborator id and project id and will only function if the project belongs to the authenticated user and it matches a bid (and in that case will remove the bid and create the collaboration.)
const CollaborationApiService = {
  postCollaborator(collaborator_id,project_id){
    return fetch(`${config.API_ENDPOINT}/collaboration`,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'Authorization' : `bearer ${TokenService.getAuthToken()}`
        },
      body:{
        collaborator_id,
        project_id
      }
    })
    .then(res=>
      (!res.ok)
        ? res.json().then(e=>Promise.reject(e))
        : res.json()
    );
  },
  getCollaborators(project_id){
    return fetch(`${config.API_ENDPOINT}/collaborators/${project_id}`,{
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