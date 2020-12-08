import axios from 'axios';
import { configureSocket } from "../../utils/axiosInterceptor"

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
  const socket = await configureSocket()
  const { receiver, body, subject} = payload
  socket.emit('message-sent', { receiver, body, subject}, ack => {
      console.log(ack);
    });
  return true;
}

export async function loadInboxMessage(payload){
  return axios({
    method: 'get',
    url: '/messages/inbox',
    params: payload
  }).then((response)=>{
    return response.data
  }).catch((err)=>{
    return false;
  })
}

export async function makeMessageStarred(id){
  return axios({
    method: 'put',
    url: '/messages/inbox/starred/'+id,
  }).then(()=>{
    return true
  }).catch((err)=>{
    return false;
  })
}

export async function removeMessage(id){
  return axios({
    method: 'delete',
    url: '/messages/inbox/remove/'+id,
  }).then(()=>{
    return true
  }).catch((err)=>{
    return false;
  })
}
