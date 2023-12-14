import axios from 'axios'

// 获取新闻列表
export const getNewsList = (params) => {
  return axios.get('http://localhost:3000/adminapi/news/getNewsList',{params})
}
// 修改发布状态
export const upNewsPublish = (obj) => {
  return axios.put('http://localhost:3000/adminapi/news/upNewsPublish', obj)
}

// 删除新闻
export const deNewsList = (_id) => {
  return axios.delete(`http://localhost:3000/adminapi/news/deNewsList/${_id}`)
}

//获取新闻详情
export const getNewsInfo = (_id) => {
  return axios.get(`http://localhost:3000/adminapi/news/getNewsInfo/${_id}`)
}

//获取新闻数量
export const getNewsCount = () => {
  return axios.get(`http://localhost:3000/adminapi/news/getNewsCount`)
}

// 清空点赞量
export const clearLikeAPI = (id) => {
  return axios.put(`http://localhost:3000/adminapi/news/clearLike/${id}`)
}

export const deleteCommentAPI = (formModel) => {
  return axios.post(`http://localhost:3000/adminapi/news/deleteComment`, formModel)
}