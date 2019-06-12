import config from '../config';
import TokenService from './token-service';

const BidsApiService = {
  // /bids/others/:bid_id for PATCH
<<<<<<< HEAD
  updateBid(bid){
    return fetch(`${config.API_ENDPOINT}/bids/others/${bid.id}`,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(bid)
    })
  },
=======
>>>>>>> 601214ab03d94626feb9699946a8fec4e81c6b1d
  postBid(bid) {
    return fetch(`${config.API_ENDPOINT}/bids`,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(bid)
    })
      .then(res=>{
        (!res.ok)
          ? res.json().then(e=>Promise.reject(e))
          : res.json()
      })
  },
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
  },
  getBidders(project_id){
    return fetch(`${config.API_ENDPOINT}/bids/others/${project_id}`,{
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