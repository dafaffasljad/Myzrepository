import Home from '@/views/home/Home.vue'
import Center from '@/views/center/Center.vue'
import NewsAdd from '@/views/news-manage/NewsAdd.vue'
import NewsList from '@/views/news-manage/NewsList.vue'
import NewsEdit from '@/views/news-manage/NewsEdit.vue'
// import ProductAdd from '@/views/product-manage/ProductAdd.vue'
// import ProductList from '@/views/product-manage/ProductList.vue'
import UserAdd from '@/views/user-manage/UserAdd.vue'
import UserList from '@/views/user-manage/UserList.vue'
import NotFound from '@/views/not-found/NotFound.vue'
import LikeList from '@/views/like-list/LikeList.vue'
import CommentList from '@/views/comment-manage/CommentList.vue'

const routers = [
  {
    path: '/index',
    component: Home
  },
  {
    path: '/center',
    component: Center
  },
  {
    path: '/news-manage/addNews',
    component: NewsAdd
  },
  {
    path: '/news-manage/newsList',
    component: NewsList
  },
  {
    path: '/news-manage/newsEdit/:id',
    component: NewsEdit
  },
  {
    path: '/likeList',
    component: LikeList
  },
  // {
  //   path: '/product-manage/addProduct',
  //   component: ProductAdd
  // },
  // {
  //   path: '/product-manage/productList',
  //   component: ProductList
  // },
  {
    path: '/user-manage/userList',
    component: UserList,
    requireAdmin: true
  },
  {
    path: '/user-manage/addUser',
    component: UserAdd,
    requireAdmin: true
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound
  },
  {
    path: '/commentList',
    component: CommentList
  }
]

export default routers
