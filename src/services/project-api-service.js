import config from '../config';
import TokenService from './token-service';

const ProjectApiService = {
  // PATCH /api/project/:project_id 
  updateProject(project){
    return fetch(`${config.API_ENDPOINT}/project/${project.id}`,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(project),
    })
  },
  submitProject(project) {
    return fetch(`${config.API_ENDPOINT}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(project),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      );
  },
  getAllProjects() {
    return fetch(`${config.API_ENDPOINT}/projects`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    );
  },
  getProject(project_id) {
    return fetch(`${config.API_ENDPOINT}/project/${project_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    );
  },
  getProjectsForUser(id) {
    return fetch(`${config.API_ENDPOINT}/projects/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    );
  }
};

export default ProjectApiService;
