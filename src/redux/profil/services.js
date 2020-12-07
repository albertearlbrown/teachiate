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

export async function getUsers(page, name){
  const size = 1000;
  return axios({
    url: `/users/all`,
    method: 'get',
    params:{ name, size }
  }).then((response)=>{
    return response.data.data.users
  }).catch((e)=>{
    return false
  })
}

export async function updateNotificationsConfig(data){
  return axios({
    method: 'put',
    url: '/notifications/configure',
    data
  }).then(() => {
    return true;
  }).catch(()=>{
    return false;
  })
}

export async function removeAccount(){
  return axios({
    method: 'post',
    url: '/users/remove-account'
  }).then(()=>{
    return true
  }).catch((err)=>{
    return false;
  })
}

export async function sendMessage(payload){
  return axios({
    url: `/messages/send`,
    method: 'post',
    data:payload
  }).then((response)=>{
    return true
  }).catch((e)=>{
    return false
  })
}
