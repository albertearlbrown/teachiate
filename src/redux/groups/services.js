import axios from 'axios';

export async function loadGroup(id){
  return axios.get(`/group/${id}`)
  .then((res) => {
    return res.data;
  }).catch(()=>{
    return false;
  })
}
