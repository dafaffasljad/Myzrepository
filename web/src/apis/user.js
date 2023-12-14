import axios from 'axios'

// 登录接口
export const loginAPI = (formModel) => {
  return axios.post('http://localhost:3000/adminapi/user/login', formModel)
}

// 注册接口
export const registerAPI = (formModel) => {
  return axios.post('http://localhost:3000/adminapi/user/toRegister', formModel)
}

// 获取个人信息
export const getUserInfoAPI = (id) => {
  return axios.get(`http://localhost:3000/adminapi/user/getUserInfo/${id}`)
}

//发表评论
export const addCommentAPI = (formModel) => {
  return axios.post('http://localhost:3000/webapi/news/addCommment', formModel)
}
