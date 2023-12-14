import axios from 'axios'
import router from '@/router'

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // 将token挂载到请求头
    const token = localStorage.getItem('token')
    config.headers.Authorization = `bearer ${token}`
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // console.log(response.headers)
    // 取出后端传来的token进行本地存储

    const { authorization } = response.headers
    // console.log(authorization);
    authorization && localStorage.setItem('token', authorization)
    return response
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    const { status } = error.response
    if (status === 401) {
      ElMessage.error('身份过期')
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      router.push('/login')
    }
    return Promise.reject(error)
  }
)
