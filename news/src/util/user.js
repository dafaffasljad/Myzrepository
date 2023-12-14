import axios from "axios";

export const toRegister = (formModel) => {
    return axios.post('http://localhost:3000/adminapi/user/toRegister',formModel)
}

export const getUserList = () => {
    return axios.get('http://localhost:3000/adminapi/user/userList')
}

export const getUserInfo = (id) => {
    return axios.get(`http://localhost:3000/adminapi/user/getUserInfo/${id}`)
}

export const upUserInfo = (formModel) => {
    return axios.put(`http://localhost:3000/adminapi/user/upUserInfo/${formModel._id}`, formModel
    )
}

export const delUserList = (id) => {
    return axios.delete(`http://localhost:3000/adminapi/user/delUserList/${id}`)
}

