import config from '../config';
import TokenService from './token-service';

const CommentsApiService = {
  getComments(project_id) {
    return fetch(`${config.API_ENDPOINT}/comments/${project_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    );
  },

  postComment(project_id, comment) {
    return fetch(`${config.API_ENDPOINT}/comments/${project_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(comment),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      );
  }
}

export default CommentsApiService;