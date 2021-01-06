import axios from 'axios';

export async function getCurrentUser(){
  return axios.get('/users/me')
  .then((res) => {
    return res.data;
  }).catch(()=>{
    return false;
  })
}
