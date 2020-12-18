import axios from "axios";

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
  debugger
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
