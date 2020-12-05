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

export async function getNotificationConfig(){
  return axios({
    method: 'get',
    url: '/notifications',
  }).then((res) => {
    return res.data;
  }).catch(()=>{
    return false;
  })
}
