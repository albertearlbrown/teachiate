import axios from 'axios';

export async function updateBackgroundInfo(data){
  return axios({
    method: 'put',
    url: '/users/background-info',
    data: {...data},
  }).then((res) => {
    return res.data;
  }).catch(()=>{
    return false;
  })
}
