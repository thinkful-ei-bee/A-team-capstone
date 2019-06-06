import config from '../config';
import TokenService from './token-service';

const BidsApiService = {
  getUsersBids(){
    return fetch(`${config.API_ENDPOINT}/bids`,{
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

export default BidsApiService;