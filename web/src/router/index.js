import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import News from '../views/News.vue'
import New from '../views/New.vue'
import Login from '../views//Login.vue'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/home', component: Home },
    { path: '/news', component: News },
    { path: '/new/:id', component: New },
    { path: '/', redirect: '/news' },
    { path: '/login', component: Login }
  ]
})

router.beforeEach((to) => {
  console.log(to.path)
  if (!localStorage.getItem('token') && to.path !== '/login') {
    alert('你还未登录')
    return '/login'
  }
  Nprogress.start()
  return
})

router.afterEach(() => {
  Nprogress.done()
})

export default router
