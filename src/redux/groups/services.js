import axios from "axios";
import { configureSocket } from "../../utils/axiosInterceptor"

export async function loadGroup(id) {
  return axios
    .get(`/group/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return false;
    });
}

export async function getGroupPosts(id) {
  return axios
    .get(`/group/${id}/posts`)
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return false;
    });
}

export async function createNewPost({ payload }) {
  const { id, image, content } = payload;
  return axios({
    method: "post",
    url: `/group/${id}/posts`,
    data: { image, content },
  })
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return false;
    });
}

export async function likePost({ payload }) {
  const { postId } = payload;
  return axios({
    method: "post",
    url: `/group/posts/${postId}/likes`,
  })
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return false;
    });
}

export async function makePostTracked({ payload }) {
  const { postId } = payload;
  return axios({
    method: "post",
    url: `/group/posts/${postId}/tracked`,
  })
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return false;
    });
}

export async function createComment({ payload }) {
  const { postId, content } = payload;
  return axios({
    method: "post",
    url: `/group/posts/${postId}/comments`,
    data: { content }
  })
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return false;
    });
}
