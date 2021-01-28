import axios from 'axios';

export async function getSchoolOpeningUpdates(){
  return axios.get('/community')
  .then((res) => {
    return res.data;
  }).catch(()=>{
    return false;
  })
}
export async function getCommunityFeeds(){
  return axios.get('/communities-feed')
  .then((res) => {
    return res.data;
  }).catch(()=>{
    return false;
  })
}
export async function replyComment(id, commentId, comment){
  return axios({
    method: 'post',
    url: `/communities-feed/${id}/comments/${commentId}`,
    data: comment
  }).then(()=>{
    return true
  }).catch((err)=>{
    return false;
  })
}
export async function replyCommentSchoolUpdates(id, commentId, comment){
  return axios({
    method: 'post',
    url: `/community/${id}/comments/${commentId}`,
    data: comment
  }).then(()=>{
    return true
  }).catch((err)=>{
    return false;
  })
}
