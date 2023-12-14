import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import MainBox from '@/views/MainBox.vue'
import routers from './config'
import {useUserStore} from '../stores'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/mainbox',
      name: 'mainbox',
      component: MainBox
    },
    {
      path: '/',
      redirect: '/index'
    }
  ]
})

routers.forEach((item) => router.addRoute('mainbox', item))
// 定义路由前置守卫
router.beforeEach(async (to) => {
  const userStore=useUserStore()
  // console.log(userStore.userInfo);
  if (!localStorage.getItem('token') && to.path !== '/login') {
    await ElMessageBox.alert('你还未进行登录！', '温馨提示', {
      type: 'warning',
      confirmButtonText: '去登录'
    })
    return '/login'
  } else {
    if (to.path === '/user-manage/userList' || to.path === '/user-manage/addUser') {
      if (userStore.userInfo.role === 1) {
        return
      } else {
        alert('你没有权限访问此页面！')
        return '/'
      }
    }
  }
})

export default router
