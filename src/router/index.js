import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/container/Index'
import Signin from '@/container/Signin'
import Signup from '@/container/Signup'
import Admin from '@/container/Admin/index'
import AdminUser from '@/container/Admin/UserList'
import AdminGoods from '@/container/Admin/GoodsList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      children: [
        {
          path: 'user',
          name: 'AdminUser',
          component: AdminUser
        },
        {
          path: 'goods',
          name: 'AdminGoods',
          component: AdminGoods
        }
      ]
    }
  ]
})
