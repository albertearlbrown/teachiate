import axios from 'axios';

const baseUrl = "https://api.teachiate.com"

const getUsers = async (payload) => {
  const { page, sort, role, name } = payload

  const res = await axios({
    url: `${baseUrl}/users/all`,
    method: 'get',
    params: { page, sort, role, name }
  })

  return res.data.data
}

const getPosts = async (payload) => {
  const { category, subcategory } = payload

  const res = await axios({
    type: 'get',
    url: `${baseUrl}/forum`,
    params: {
      category, subcategory
    }
  })
  return res.data.data
}

const getGroups = async (payload) => {
  const { page, name } = payload

  const res = await axios({
    url: `${baseUrl}/group/list`,
    method: 'get',
    params: { page, name }
  })
  return res.data.data
}

export {
  getUsers,
  getPosts,
  getGroups,
}